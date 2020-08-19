package org.fhi360.lamis.modules.database.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.fhi360.lamis.modules.database.service.vm.InstalledModule;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UpdateStatusService {
    private final JdbcTemplate jdbcTemplate;

    @Scheduled(cron = "0 0/30 * * * ?")
    public void update() {
        List<Long> nodeIds = jdbcTemplate.queryForList("select max(facility_id) from patient where last_modified >= " +
                "current_date - INTERVAL '1 year'", Long.class);
        if (!nodeIds.isEmpty()) {
            String nodeId = nodeIds.get(0).toString();

            List<InstalledModule> modules = jdbcTemplate.query("select name, version from module where install_on_boot = false",
                    new BeanPropertyRowMapper<>(InstalledModule.class));

            modules.forEach(module -> {
                try {
                    jdbcTemplate.queryForObject("select version from update_status where name = ? and node_id = ?",
                            String.class, module.getName(), nodeId);
                    jdbcTemplate.update("update update_status set version = ? where name = ?", module.getVersion(), module.getName());
                } catch (Exception e) {
                    jdbcTemplate.update("insert into update_status (name, version, node_id) values(?, ?, ?)",
                            module.getName(), module.getVersion(), nodeId);
                }
            });
        }
    }
}
