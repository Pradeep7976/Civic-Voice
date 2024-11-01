package org.koder.miniprojectbackend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.koder.miniprojectbackend.entity.*;
import org.koder.miniprojectbackend.exception.GeneralException;
import org.koder.miniprojectbackend.exception.UserFoundException;
import org.koder.miniprojectbackend.exception.UserNotFoundException;
import org.koder.miniprojectbackend.repository.UserRatingRepository;
import org.koder.miniprojectbackend.repository.UserRepository;
import org.koder.miniprojectbackend.util.Role;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.koder.miniprojectbackend.util.imageKitUtil;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    imageKitUtil imageKitUtil;

    @Autowired
    ObjectMapper mapper;
    @Autowired
    ModelMapper modelMapper;

    @Autowired
    UserRatingRepository userRatingRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtService jwtService;

    public User saveUser(MultipartFile file, String userstr) throws Exception {
        if (file == null) {
            throw new GeneralException("No file", null);
        }
        User user = null;
        try {
            user = mapper.readValue(userstr, User.class);
        } catch (JsonProcessingException e) {
            throw new GeneralException("Mapping issue check the user json once",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        String imageUrl="abcd";
//        String imageUrl = imageKitUtil.uploadFile(file).getUrl();
        user.setImageurl(imageUrl);
        user.setNonLocked(true);
        String noOppPassword = user.getPassword();
        user.setPassword(passwordEncoder.encode(noOppPassword));
        try {
            return userRepository.save(user);

        } catch (Exception e) {
            if (e.getMessage().contains("duplicate key")) {
                throw new UserFoundException(e.getMessage());
            } else {
                throw new GeneralException(e.getMessage(), null);
            }
        }
    }

    public List<UserDTO> findAllUsers() {
        return userRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public ImageKitResponse upload(MultipartFile file) throws IOException {
        return imageKitUtil.uploadFile(file);
    }

    public String saveRating(Rating rating) {
        try {
            userRatingRepository.save(rating);
            return "rating Saved";
        } catch (GeneralException e) {
            throw new GeneralException("Error saving the rating", null);
        }
    }

    public User getDetailsByUid(Long id) {
        try {
            return userRepository.findByUid(id);
        } catch (Exception e) {
            throw e;
        }
    }
    public UserDTO toDto(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByPhone(username);
    }
}
