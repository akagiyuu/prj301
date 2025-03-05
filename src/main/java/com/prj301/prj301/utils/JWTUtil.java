package com.prj301.prj301.utils;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTUtil {
    @Value("${jwt.expiration-time}")
    private long EXPIRATION_TIME;

    public String generateToken(Long id) {
        return Jwts
            .builder()
            .setSubject(id.toString())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts
                .parserBuilder()
                .build()
                .parseClaimsJwt(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public long extractId(String token) throws JwtException {
        String rawId = Jwts
            .parserBuilder()
            .build()
            .parseClaimsJwt(token)
            .getBody()
            .getSubject();

        return Long.parseLong(rawId);
    }
}
