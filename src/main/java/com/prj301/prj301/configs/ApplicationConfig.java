package com.prj301.prj301.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().info(
            new Info()
                .title("API doc")
                .version("1.0.0")
                .description("API doc")
        );
    }
}
