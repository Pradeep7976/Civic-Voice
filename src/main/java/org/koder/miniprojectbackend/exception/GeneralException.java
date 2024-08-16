package org.koder.miniprojectbackend.exception;

import jakarta.annotation.Nullable;
import org.springframework.http.HttpStatus;

public class GeneralException extends RuntimeException {
    HttpStatus httpStatus;

    public GeneralException(String message, @Nullable HttpStatus httpStatus) {
        super(message);
        if (httpStatus == null)
            this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        else this.httpStatus = httpStatus;
    }
}
