package com.example.demo.security.jwt;

import com.example.demo.security.UserPrinciple;
import io.jsonwebtoken.Claims;
import lombok.Builder;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

public interface JwtProvider {

    String generateToken(UserPrinciple auth);
    Authentication getAuthentication(HttpServletRequest request);
    boolean isTokenValid(HttpServletRequest request);
    Claims extractClaims(HttpServletRequest request);

}
