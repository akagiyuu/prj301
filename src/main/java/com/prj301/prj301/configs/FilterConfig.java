package com.prj301.prj301.configs;

import com.prj301.prj301.filters.JWTAuthFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    @Bean
    public JWTAuthFilter jwtAuthFilter() {
        return new JWTAuthFilter();
    }

    @Bean
    public FilterRegistrationBean<JWTAuthFilter> jwtFilterRegistrationBean() {
        FilterRegistrationBean<JWTAuthFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(jwtAuthFilter());
        registrationBean.setOrder(1);
        return registrationBean;
    }
}
