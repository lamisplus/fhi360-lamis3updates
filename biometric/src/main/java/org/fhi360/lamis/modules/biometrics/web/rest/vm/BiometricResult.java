package org.fhi360.lamis.modules.biometrics.web.rest.vm;

import lombok.Data;

@Data
public class BiometricResult {
    private String id;
    private String message;
    private byte[] template;
    private boolean identified;
}
