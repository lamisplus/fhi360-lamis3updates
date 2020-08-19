package org.lamisplus.modules.lamis.legacy;

import org.lamisplus.modules.base.config.ContextProvider;
import org.lamisplus.modules.base.module.ModuleLifecycle;
import org.springframework.jdbc.core.JdbcTemplate;

public class LegacyPreInstall implements ModuleLifecycle {

    @Override
    public void preInstall() {
        ContextProvider.getBean(JdbcTemplate.class).update("update module set priority = 1 where name = 'LamisLegacyModule'");
    }
}
