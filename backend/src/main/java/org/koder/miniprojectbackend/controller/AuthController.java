package org.koder.miniprojectbackend.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.koder.miniprojectbackend.entity.AuthenticationRequest;
import org.koder.miniprojectbackend.entity.AuthenticationResponse;
import org.koder.miniprojectbackend.entity.User;
import org.koder.miniprojectbackend.service.JwtService;
import org.koder.miniprojectbackend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {


    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    Logger logger = LoggerFactory.getLogger(AuthController.class);
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestParam("file") MultipartFile file, @RequestParam("user") String user,HttpServletResponse response) throws Exception {
        logger.info(user);
        User savedUser = userService.saveUser(file, user);
        String jwtToken = jwtService.generateToken(savedUser);
        Cookie jwtCookie = new Cookie("token", jwtToken);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setMaxAge(24 * 60 * 60);
        jwtCookie.setPath("/");
        response.addCookie(jwtCookie);
        return ResponseEntity.ok(AuthenticationResponse.builder().token(jwtToken).build());
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getPhone(), request.getPassword()));
        try {
            User user = (User) userService.loadUserByUsername(request.getPhone());
            String jwtToken = jwtService.generateToken(user);
            Cookie jwtCookie = new Cookie("token", jwtToken);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setMaxAge(24 * 60 * 60);
            jwtCookie.setPath("/");
            response.addCookie(jwtCookie);
            Map<String,String> map = new HashMap<>();
            map.put("token", jwtToken);
            map.put("uid", String.valueOf(user.getUid()));
            return ResponseEntity.ok(map);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @GetMapping("/health")
    public ResponseEntity<String> healthController(){
        return ResponseEntity.ok("Hello everything is fine just login");
    }
}
