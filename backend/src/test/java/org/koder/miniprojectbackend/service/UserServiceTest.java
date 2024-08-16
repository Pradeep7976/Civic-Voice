package org.koder.miniprojectbackend.service;

import org.junit.jupiter.api.Test;
import org.koder.miniprojectbackend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import static org.junit.jupiter.api.Assertions.*;


class UserServiceTest {

    @Test
    void saveUser() {
        RestClient restClient = RestClient.create();

    }

    @Test
    void findAllUsers() {
    }
}