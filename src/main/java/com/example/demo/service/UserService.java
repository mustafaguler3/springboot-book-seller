package com.example.demo.service;

import com.example.demo.model.Role;
import com.example.demo.model.User;

import java.util.Optional;

public interface UserService {

    User saveUser(User user);
    Optional<User> findByUsername(String username);
    void changeRole(Role newRole, String username);
}
