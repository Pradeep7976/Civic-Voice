package org.koder.miniprojectbackend.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {
    Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(UserFoundException.class)
    public ResponseEntity<String> handleUserFoundException(UserFoundException ex) {
        System.out.println(ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
    }

    @ExceptionHandler(GeneralException.class)
    public ResponseEntity<String> handleGeneralException(GeneralException ex) {
        System.out.println(ex.getMessage());
        return ResponseEntity.status(ex.httpStatus).body(ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
        System.out.println(ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @ExceptionHandler(DuplicateProblemException.class)
    public ResponseEntity<String> handleDuplicateProblemException(DuplicateProblemException ex) {
        logger.error("Problem already exists");
        return ResponseEntity.status(ex.getHttpStatus()).body("problem already reported");
    }
}
