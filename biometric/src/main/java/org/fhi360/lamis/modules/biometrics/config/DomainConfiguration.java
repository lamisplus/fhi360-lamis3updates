package org.fhi360.lamis.modules.biometrics.config;

import com.foreach.across.modules.hibernate.jpa.repositories.config.EnableAcrossJpaRepositories;
import org.fhi360.lamis.modules.biometrics.domain.BiometricDomain;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAcrossJpaRepositories(basePackageClasses = {BiometricDomain.class})
public class DomainConfiguration {
}
