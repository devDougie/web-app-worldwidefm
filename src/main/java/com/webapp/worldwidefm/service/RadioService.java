package com.webapp.worldwidefm.service;

import com.webapp.worldwidefm.client.RadioBrowserClient;
import com.webapp.worldwidefm.dto.RadioResponseDTO;
import com.webapp.worldwidefm.model.Radio;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RadioService {

    private final RadioBrowserClient radioBrowserClient;

    @Cacheable(value = "radios", key = "#north + ',' + #south + ',' + #east + ',' + #west + ',' + #limit")
    public List<RadioResponseDTO> getRadiosByBoundingBox(Double north, Double south,
                                                         Double east, Double west,
                                                         Integer limit) {
        List<Radio> radios = radioBrowserClient.fetchByBoundingBox(north, south, east, west, limit);

        return radios.stream()
                .map(RadioResponseDTO::from)
                .toList();
    }

    @Cacheable(value = "radioById", key = "#stationuuid")
    public RadioResponseDTO getRadioById(String stationuuid) {
        Radio radio = radioBrowserClient.fetchById(stationuuid);

        if (radio == null) {
            return null;
        }

        return RadioResponseDTO.from(radio);
    }
}