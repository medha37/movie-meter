package com.moviemeter.backend;

import lombok.*;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    // No-args constructor
    public AuthResponse() {
    }

    // All-args constructor
    public AuthResponse(String token) {
        this.token = token;
    }
}