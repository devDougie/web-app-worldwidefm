package com.webapp.worldwidefm.client;

import com.webapp.worldwidefm.model.Radio;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Component
public class RadioBrowserClient {

    private final WebClient webClient;

    @Value("${radio.browser.base-url}")
    private String baseUrl;

    public RadioBrowserClient(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<Radio> fetchAllWithGeoInfo() {
        Map<String, Object> body = Map.of(
                "has_geo_info", true,
                "hidebroken", true,
                "limit", 20000,
                "offset", 0
        );

        return webClient.post()
                .uri(baseUrl + "/stations/search")
                .bodyValue(body)
                .retrieve()
                .bodyToFlux(Radio.class)
                .collectList()
                .onErrorResume(e -> Mono.just(List.of()))
                .block();
    }

    public Radio fetchById(String stationuuid) {
        return webClient.get()
                .uri(baseUrl + "/stations/byuuid/" + stationuuid)
                .retrieve()
                .bodyToFlux(Radio.class)
                .next()
                .onErrorResume(e -> Mono.empty())
                .block();
    }
}