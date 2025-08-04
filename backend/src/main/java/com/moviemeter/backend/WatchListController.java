package com.moviemeter.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/watchlist")
public class WatchListController {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/{imdbId}")
    public ResponseEntity<?> addToWatchList(@RequestHeader("Authorization") String authHeader, @PathVariable String imdbId) {
        String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
        Optional<User> userOpt = userRepo.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            List<String> watchList = user.getWatchList();
            if (!watchList.contains(imdbId)) {
                watchList.add(imdbId);
                userRepo.save(user);
            }
            return ResponseEntity.ok(Map.of("message", "Movie added to watchlist"));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
    }

    @GetMapping
    public ResponseEntity<?> getWatchList(@RequestHeader("Authorization") String authHeader) {
        String email = jwtUtil.extractUsername(authHeader.replace("Bearer ", ""));
        Optional<User> userOpt = userRepo.findByEmail(email);

        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get().getWatchList());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
    }
}