package org.fhi360.lamis.modules.database.config;

import com.foreach.across.modules.hibernate.jpa.repositories.config.EnableAcrossJpaRepositories;
import org.fhi360.lamis.modules.database.domain.DatabaseDomain;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAcrossJpaRepositories(basePackageClasses = DatabaseDomain.class)
public class DomainConfiguration {
}
