package com.webapp.worldwidefm.dto;

import com.webapp.worldwidefm.model.Radio;
import lombok.Data;

@Data
public class RadioResponseDTO {

    private String stationuuid;
    private String name;
    private String country;
    private String city;
    private String tags;
    private String urlResolved;
    private Double latitude;
    private Double longitude;
    private Integer bitrate;
    private String codec;
    private String favicon;

    public static RadioResponseDTO from(Radio radio) {
        RadioResponseDTO dto = new RadioResponseDTO();
        dto.setStationuuid(radio.getStationuuid());
        dto.setName(radio.getName());
        dto.setCountry(radio.getCountry());
        dto.setCity(radio.getCity());
        dto.setTags(radio.getTags());
        dto.setUrlResolved(radio.getUrlResolved());
        dto.setLatitude(radio.getLatitude());
        dto.setLongitude(radio.getLongitude());
        dto.setBitrate(radio.getBitrate());
        dto.setCodec(radio.getCodec());
        dto.setFavicon(radio.getFavicon());
        return dto;
    }
}