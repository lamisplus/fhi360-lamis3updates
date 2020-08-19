package org.lamisplus.modules.lamis.legacy;

import com.foreach.across.core.AcrossModule;
import com.foreach.across.core.annotations.AcrossDepends;
import com.foreach.across.core.context.configurer.ComponentScanConfigurer;
import com.foreach.across.modules.hibernate.jpa.AcrossHibernateJpaModule;

@AcrossDepends(required = AcrossHibernateJpaModule.NAME)
public class LamisLegacyModule extends AcrossModule {
    public static final String NAME = "LamisLegacyModule";

    public LamisLegacyModule() {
        super();
        addApplicationContextConfigurer(
                new ComponentScanConfigurer(getClass().getPackage().getName() + ".service",
                        getClass().getPackage().getName() + ".web"));
    }

    @Override
    public String getName() {
        return NAME;
    }
}
