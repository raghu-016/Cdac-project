package com.querybridge.api_gateway.security;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;

public class JwtUtil {

    private static final String SECRET = "querybridge-secret-key-querybridge-secret-key";
    private static final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public static void validateToken(String token) {
        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
    }
}
