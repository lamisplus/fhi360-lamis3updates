package org.lamisplus.modules.lamis.legacy.web.rest.errors;

import org.lamisplus.modules.base.web.errors.BadRequestAlertException;
import org.lamisplus.modules.base.web.errors.ErrorConstants;
import org.zalando.problem.Status;

public class ObservationValidationException extends BadRequestAlertException {

    public ObservationValidationException(String defaultMessage) {
        super(ErrorConstants.ERR_VALIDATION, defaultMessage, Status.BAD_REQUEST.toString());
    }
}
