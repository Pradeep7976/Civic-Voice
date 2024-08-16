package org.koder.miniprojectbackend.controller;

import org.koder.miniprojectbackend.entity.ImageKitResponse;
import org.koder.miniprojectbackend.entity.Rating;
import org.koder.miniprojectbackend.entity.User;
import org.koder.miniprojectbackend.entity.UserDTO;
import org.koder.miniprojectbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.findAllUsers();
    }

    @PostMapping("/upload")
    public ImageKitResponse upload(@RequestParam("file") MultipartFile file) throws Exception {
        return userService.upload(file);
    }
    @PostMapping("/rating")
    public String rating(@RequestBody Rating rating){
        return userService.saveRating(rating);
    }
    @GetMapping("/{id}")
    public UserDTO getUserDetailsByUid(@PathVariable Long id){
        return userService.toDto(userService.getDetailsByUid( id));
    }
}
