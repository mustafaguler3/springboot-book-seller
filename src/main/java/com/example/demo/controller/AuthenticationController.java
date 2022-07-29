package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.AuthenticationService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/authentication")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private UserService userService;

    @PostMapping("sign-up")
    public ResponseEntity<?> signUp(@RequestBody User user){
        if (userService.findByUsername(user.getUsername()).isPresent()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(userService.saveUser(user),HttpStatus.CREATED);
    }
    @PostMapping("sign-in")
    public ResponseEntity<?> signIn(@RequestBody User user){
        return new ResponseEntity<>(authenticationService.signInAndReturnJWT(user),HttpStatus.OK);
    }
}





























