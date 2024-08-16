package org.koder.miniprojectbackend.exception;


import jakarta.annotation.Nullable;
import org.springframework.http.HttpStatus;


public class DuplicateProblemException extends RuntimeException {
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    HttpStatus httpStatus;

    public DuplicateProblemException(String message, @Nullable HttpStatus httpStatus) {
        super(message);
        if (httpStatus == null)
            this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        else this.httpStatus = httpStatus;
    }

}
