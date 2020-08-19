package org.fhi360.lamis.modules.patient.config;

import com.foreach.across.modules.hibernate.jpa.repositories.config.EnableAcrossJpaRepositories;
import org.fhi360.lamis.modules.patient.domain.PatientDomain;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAcrossJpaRepositories(basePackageClasses = {PatientDomain.class})
public class DomainConfiguration {
}
