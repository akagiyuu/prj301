package com.prj301.user.filters;

import com.prj301.user.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {
    private static final String ERROR_MESSAGE = "Missing or invalid token";

    @Autowired
    private JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null) {
            filterChain.doFilter(request, response);
            return;
        }
        if (!authHeader.startsWith("Bearer")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ERROR_MESSAGE);
        }

        final String token = authHeader.substring(7);

        final UUID id = jwtUtil.extractId(token);

        request.setAttribute("user-id", id);

        filterChain.doFilter(request, response);
    }
}