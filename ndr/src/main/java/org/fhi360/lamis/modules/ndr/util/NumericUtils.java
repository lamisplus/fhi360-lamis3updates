package org.fhi360.lamis.modules.ndr.util;

public class NumericUtils {

    public static boolean isNumeric(String value) {
        try {
            Double.parseDouble(value);
            return true;
        }catch (Exception e) {
            return false;
        }
    }
}
