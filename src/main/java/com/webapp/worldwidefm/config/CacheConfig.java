package com.webapp.worldwidefm.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class CacheConfig {

    @Value("${radio.browser.cache.ttl}")
    private int ttl;

    @Value("${radio.browser.cache.max-size}")
    private int maxSize;

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager("radios");
        cacheManager.setCaffeine(
                Caffeine.newBuilder()
                        .expireAfterWrite(ttl, TimeUnit.SECONDS)
                        .maximumSize(maxSize)
        );
        return cacheManager;
    }
}