package org.lamisplus.modules.lamis.legacy.domain.entities.enumerations;

public enum ClientStatus {
    ART_START("ART Start"), ART_RESTART("ART Restart"), KNOWN_DEATH("Died (Confirmed)"), ART_TRANSFER_OUT("ART Transfer Out"),
    PRE_ART_TRANSFER_OUT("Pre-ART Transfer Out"), LOST_TO_FOLLOWUP("Lost To Followup"),
    PREVIOUSLY_UNDOCUMENTED_TRANSFER_CONFIRMED("Previously Undocumented Patient Transfer (Confirmed)"),
    TRACED_UNABLE_TO_LOCATE("Traced Patient (Unable to locate)"), TRACED_AGREED_TO_RETURN_TO_CARE("Traced Patient and agreed to return to care"),
    DID_NOT_ATTEMPT_TO_TRACE("Did Not Attempt to Trace Patient"), HIV_EXPOSED_STATUS_UNKNOWN("HIV Exposed Status Unknown"),
    STOPPED_TREATMENT("Stopped Treatment"), HIV_PLUS_NON_ART("HIV+ non ART"), PRE_ART_TRANSFER_IN("Pre-ART Transfer In"),
    ART_TRANSFER_IN("ART Transfer In"), ART_START_EXTERNAL("ART Start - External"),
    HIV_EXPOSED_INFANT_NEGATION("HIV exposed Infant status negative"), HIV_NEGATIVE("HIV Negative"),
    HIV_EXPOSED_BABY_HIV_STATUS_UNKNOWN("HIV exposed baby HIV status unknown");

    private String status;

    ClientStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
