package org.lamisplus.modules.lamis.legacy.config;

import com.foreach.across.modules.hibernate.jpa.repositories.config.EnableAcrossJpaRepositories;
import org.lamisplus.modules.base.domain.BaseDomain;
import org.lamisplus.modules.lamis.legacy.domain.LamisLegacyDomain;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAcrossJpaRepositories(basePackageClasses = {LamisLegacyDomain.class})
public class DomainConfiguration {
}
