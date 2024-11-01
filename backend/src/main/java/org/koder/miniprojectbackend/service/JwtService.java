package org.koder.miniprojectbackend.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.java.Log;
import org.koder.miniprojectbackend.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private static final String SECRET_KEY = "XLAMb7Nt/BPEWkcMzQDHRNwe9AjczkYWAiK7Scyl79Hzal08/FUcMS9hOZ26lUVl";

    Logger logger= LoggerFactory.getLogger(JwtService.class);

    public String extractUserName(String jwt) {
        return extractClaims(jwt, Claims::getSubject);
    }

    public <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extactAllClaims(token);
        if(claims!=null)
            return claimsResolver.apply(claims);
        else
            return null;
    }

    public String generateToken(User user) {
        return generateToken(new HashMap<>(), user);
    }

    public String generateToken(Map<String, Object> extractClaims, User user) {
        return Jwts.builder().setClaims(extractClaims)
                .setSubject(user.getPhone())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Claims extactAllClaims(String token) {
        Claims claims = null;
        try {
            claims = Jwts
                    .parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build().
                    parseClaimsJws(token).getBody();
        } catch (Exception e) {
            logger.error("Error verifying the signature");
            return null;
        }
        return claims;
    }

    public boolean isTokenValid(String token, User user) {
        final String username = extractUserName(token);
        return (username.equals(user.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
