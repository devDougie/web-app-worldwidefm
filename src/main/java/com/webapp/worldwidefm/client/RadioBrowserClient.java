package com.webapp.worldwidefm.client;

import com.webapp.worldwidefm.model.Radio;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class RadioBrowserClient {

    private final WebClient webClient;

    @Value("${radio.browser.base-url}")
    private String baseUrl;

    public RadioBrowserClient(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<Radio> fetchByBoundingBox(Double north, Double south,
                                          Double east, Double west,
                                          Integer limit) {
        return webClient.get()
                .uri(baseUrl + "/stations/search", uriBuilder -> uriBuilder
                        .queryParam("north", north)
                        .queryParam("south", south)
                        .queryParam("east", east)
                        .queryParam("west", west)
                        .queryParam("limit", limit)
                        .queryParam("hidebroken", true)
                        .queryParam("has_geo_info", true)
                        .build())
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