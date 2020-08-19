package org.lamisplus.modules.lamis.legacy.domain.entities.enumerations;

public enum DmocType {
    CARC("CARC"), CPARP("CPARP"), FAST_TRACK("Fast Track"), F_CARG("F-CARG"), S_CARG("S-CARG"),
    ARC("Adolescent Refill Club"), MMD("MMD"), MMS("MMS");

    private String type;

    DmocType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
