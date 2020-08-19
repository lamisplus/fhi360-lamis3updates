package org.fhi360.lamis.modules.patient.service.providers.vm;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Summary implements Comparable<Summary> {
    private String header;
    private List<Field> fields = new ArrayList<>();
    private Integer order = 10;

    @Override
    public int compareTo(Summary o) {
        return o.order.compareTo(order);
    }
}
