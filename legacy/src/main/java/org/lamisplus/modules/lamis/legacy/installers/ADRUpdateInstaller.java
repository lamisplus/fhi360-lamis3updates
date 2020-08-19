package org.lamisplus.modules.lamis.legacy.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(2)
@Installer(name = "cadr-schema-installer", description = "Updates clinic_adverse_drug_reaction table", version = 1)
public class ADRUpdateInstaller extends AcrossLiquibaseInstaller {
    public ADRUpdateInstaller() {
        super("classpath:installers/legacy/schema/cadr.xml");
    }
}
