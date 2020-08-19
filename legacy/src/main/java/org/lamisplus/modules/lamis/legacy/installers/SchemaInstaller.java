package org.lamisplus.modules.lamis.legacy.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;

@Order(1)
@Installer(name = "schema-installer", description = "Installs the required database tables", version = 7)
@Slf4j
public class SchemaInstaller extends AcrossLiquibaseInstaller {
    public SchemaInstaller() {
        super("classpath:installers/legacy/schema/schema.xml");
    }
}
