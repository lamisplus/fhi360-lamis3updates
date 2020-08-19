package org.fhi360.lamis.modules.patient.service;

import com.foreach.across.core.annotations.Exposed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fhi360.lamis.modules.patient.service.providers.ObservationValidator;
import org.lamisplus.modules.base.module.BeanProvider;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Exposed
public class ObservationValidatorsProvider {
    private final BeanProvider beanProvider;

    public List<ObservationValidator> getValidators(Class<?> type) {
        return beanProvider.getBeansOfType(ObservationValidator.class)
                .stream()
                .filter(v -> v.applicableForType(type))
                .collect(Collectors.toList());
    }
}
