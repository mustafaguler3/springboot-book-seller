package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "username",unique = false)
    private String username;
    @Column(name = "password",unique = false)
    private String password;
    @Column(name = "name",unique = false)
    private String name;
    @Column(name = "create_time",unique = false)
    private LocalDateTime createTime;
    @Column(name = "role",unique = false)
    private Role role;
    @Transient
    private String token;
}



























