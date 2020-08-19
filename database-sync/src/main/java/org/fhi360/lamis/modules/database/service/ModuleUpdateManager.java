package org.fhi360.lamis.modules.database.service;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.fhi360.lamis.modules.database.domain.repositories.ModuleUpdateRepository;
import org.lamisplus.modules.base.config.ApplicationProperties;
import org.lamisplus.modules.base.domain.entities.Module;
import org.lamisplus.modules.base.domain.repositories.ModuleArtifactRepository;
import org.lamisplus.modules.base.domain.repositories.ModuleRepository;
import org.lamisplus.modules.base.module.ModuleFileStorageService;
import org.lamisplus.modules.base.module.ModuleManager;
import org.lamisplus.modules.base.module.ModuleService;
import org.lamisplus.modules.base.module.ModuleUtils;
import org.lamisplus.modules.base.yml.ModuleConfig;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.jar.Attributes;
import java.util.jar.JarInputStream;
import java.util.jar.Manifest;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ModuleUpdateManager {
    private final ModuleService moduleService;
    private final ModuleFileStorageService storageService;
    private final ModuleUpdateRepository moduleUpdateRepository;
    private final ModuleRepository moduleRepository;
    private final ApplicationProperties applicationProperties;
    private final JdbcTemplate jdbcTemplate;
    private Path rootLocation;

    public void installUpdates() {
        moduleUpdateRepository.findByInstallIsTrue().forEach(moduleUpdate -> {
            byte[] data = moduleUpdate.getData();
            InputStream inputStream = new ByteArrayInputStream(data);
            Module module = moduleService.uploadModuleData(moduleUpdate.getFileName(), inputStream);
            store(module.getName(), moduleUpdate.getFileName(), new ByteArrayInputStream(data));
            jdbcTemplate.query("select data from module_update where id = ?", rs-> {
                try {
                    IOUtils.copy(new ByteArrayInputStream(rs.getBytes(1)),
                            new FileOutputStream(rootLocation.resolve(Paths.get(module.getArtifact())).toFile()));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }, moduleUpdate.getId());
            moduleService.update(module, false);
            moduleUpdate.setInstall(false);
            moduleUpdateRepository.save(moduleUpdate);
            jdbcTemplate.update("update module_update set install = false where id = ?", moduleUpdate.getId());
        });

        moduleUpdateRepository.findByUninstallIsTrue().forEach(moduleUpdate -> {
            moduleRepository.findByName(moduleUpdate.getName()).ifPresent(module ->
                    moduleService.uninstall(module, true));
            moduleUpdate.setUninstall(false);
            moduleUpdateRepository.save(moduleUpdate);
            jdbcTemplate.update("update module_update set uninstall = false where id = ?", moduleUpdate.getId());
        });
    }

    public List<Module> updatesAvailable() {
        return moduleUpdateRepository.findByInstallIsTrue().stream()
                .map(moduleUpdate -> {
                    byte[] data = moduleUpdate.getData();
                    InputStream inputStream = new ByteArrayInputStream(data);
                    ModuleManager.VersionInfo versionInfo = readVersionInfo(inputStream);

                    Module module = moduleService.uploadModuleData(moduleUpdate.getFileName(), inputStream);
                    module.setVersion(versionInfo.version);
                    module.setDescription(versionInfo.projectName);
                    module.setBuildTime(toZonedDateTime(versionInfo.buildTime));
                    return module;
                }).collect(Collectors.toList());
    }

    @SneakyThrows
    ModuleManager.VersionInfo readVersionInfo(InputStream jarIs) {
        ModuleManager.VersionInfo versionInfo = ModuleManager.VersionInfo.UNKNOWN;
        JarInputStream jarStream = new JarInputStream(jarIs);
        Manifest manifest = jarStream.getManifest();
        if (manifest != null) {
            Attributes attr = manifest.getMainAttributes();
            versionInfo = new ModuleManager.VersionInfo();
            versionInfo.manifest = manifest;
            versionInfo.available = true;
            versionInfo.projectName = StringUtils.defaultString(attr.getValue("Implementation-Title"), "unknown");
            versionInfo.version = StringUtils.defaultString(attr.getValue("Implementation-Version"), "unknown");
            String buildTime = attr.getValue("Build-Time");
            if (buildTime != null) {
                try {
                    versionInfo.buildTime = DateUtils.parseDate(buildTime, new String[]{"yyyyMMdd-HHmm", "yyyy-MM-dd'T'HH:mm:ss'Z'"});
                } catch (ParseException ignored) {
                }
            }
        }

        return versionInfo;
    }

    public Module uploadModuleData(String fileName, InputStream inputStream) {
        List<ModuleConfig> configs = new ArrayList<>();
        Module module = new Module();
        ModuleUtils.loadModuleConfig(inputStream, "module.yml", configs);
        if (configs.size() > 0) {
            ModuleConfig config = configs.get(0);
            fileName = this.storageService.store(config.getName(), fileName, inputStream);
            ModuleManager.VersionInfo versionInfo = this.readVersionInfo(inputStream);
            module.setArtifact(fileName);
            module.setName(config.getName());
            module.setVersion(versionInfo.version);
            module.setDescription(versionInfo.projectName);
            module.setUmdLocation(config.getUmdLocation());
            module.setBasePackage(config.getBasePackage());
        }

        return module;
    }

    private ZonedDateTime toZonedDateTime(Date date) {
        return date == null ? null : ZonedDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
    }

    public String store(String module, String name, InputStream inputStream) {
        module = module.toLowerCase();
        String filename = module + File.separator + org.springframework.util.StringUtils.cleanPath(name);
        if (filename.endsWith(File.separator)) {
            filename = filename.substring(0, filename.length() - 1) + ".jar";
        }

        if (!filename.endsWith(".jar")) {
            filename = filename + ".jar";
        }

        if (!Files.exists(this.rootLocation.resolve(module))) {
            try {
                Files.createDirectories(this.rootLocation.resolve(module));
            } catch (IOException var7) {
                var7.printStackTrace();
            }
        }

        try {
            if (filename.contains("..")) {
                throw new RuntimeException("Cannot store file with relative path outside current directory " + filename);
            } else {
                LOG.info("Saving file: {}", inputStream.available());
                FileUtils.copyInputStreamToFile(inputStream, this.rootLocation.resolve(filename).toFile());
                return filename;
            }
        } catch (IOException var6) {
            throw new RuntimeException("Failed to store file " + filename, var6);
        }
    }

    @PostConstruct
    public void init() {
        rootLocation = Paths.get(applicationProperties.getModulePath());
    }
}
