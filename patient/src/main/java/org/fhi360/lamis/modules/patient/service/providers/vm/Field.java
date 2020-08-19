package org.fhi360.lamis.modules.patient.service.providers.vm;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Field {
    public enum FieldType {INT, FLOAT, TEXT, BOOLEAN, DATE, DATETIME}
    private final FieldType type;
    private final String label;
    private final Object value;
}
