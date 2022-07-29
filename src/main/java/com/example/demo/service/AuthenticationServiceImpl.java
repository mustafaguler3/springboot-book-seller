package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.security.UserPrinciple;
import com.example.demo.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService{

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User signInAndReturnJWT(User userSignIn){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userSignIn.getUsername(),userSignIn.getPassword()));

        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        String jwt = jwtProvider.generateToken(userPrinciple);

        User sign = userPrinciple.getUser();
        sign.setToken(jwt);

        return sign;
    }
}



























