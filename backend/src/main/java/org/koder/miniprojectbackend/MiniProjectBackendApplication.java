package org.koder.miniprojectbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*")
@EnableAsync
public class MiniProjectBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(MiniProjectBackendApplication.class, args);
    }
}
