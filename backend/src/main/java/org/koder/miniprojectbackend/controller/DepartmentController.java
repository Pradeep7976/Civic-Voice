package org.koder.miniprojectbackend.controller;

import org.koder.miniprojectbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/dept")
public class DepartmentController {

    @Autowired
    UserService userService;

    @GetMapping("/getdeptname/{did}")
    public ResponseEntity<String> getDeptName(@PathVariable Long did) {
        String name = userService.getUserNameFromUid(did);
        return ResponseEntity.ok(name);
    }
}
