package com.webapp.worldwidefm.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Radio {

    private String stationuuid;
    private String name;
    private String country;
    private String countrycode;
    private String state;
    private String city;
    private String tags;
    private String url;

    @JsonProperty("url_resolved")
    private String urlResolved;

    private Double latitude;
    private Double longitude;
    private Integer bitrate;
    private String codec;
    private String favicon;
    private Integer votes;

    @JsonProperty("lastchangetime")
    private String lastChangeTime;
}