package com.example.demo.service;

import com.example.demo.model.User;

public interface AuthenticationService {
    User signInAndReturnJWT(User userSignIn);
}
