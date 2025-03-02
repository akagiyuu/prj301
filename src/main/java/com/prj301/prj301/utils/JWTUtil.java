package com.prj301.prj301.utils;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JWTUtil {
    @Value("${jwt.secret-key}")
    private static String SECRET_KEY;

    @Value("${jwt.secret-key}")
    private static long EXPIRATION_TIME;

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public String generateToken(Long id) {
        return Jwts.builder()
                   .setSubject(id.toString())
                   .setIssuedAt(new Date())
                   .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                   .signWith(key, SignatureAlgorithm.HS256)
                   .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJwt(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public long extractId(String token) throws JwtException {
        String rawId = Jwts.parserBuilder()
                           .setSigningKey(key)
                           .build()
                           .parseClaimsJwt(token)
                           .getBody()
                           .getSubject();

        return Long.parseLong(rawId);
    }
}
