package com.webapp.worldwidefm.controller;

import com.webapp.worldwidefm.dto.RadioResponseDTO;
import com.webapp.worldwidefm.service.RadioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RadioController {

    private final RadioService radioService;

    @GetMapping("/radios")
    public ResponseEntity<List<RadioResponseDTO>> getRadios(
            @RequestParam Double north,
            @RequestParam Double south,
            @RequestParam Double east,
            @RequestParam Double west,
            @RequestParam(defaultValue = "100") Integer limit) {

        List<RadioResponseDTO> radios = radioService.getRadiosByBoundingBox(north, south, east, west, limit);
        return ResponseEntity.ok(radios);
    }

    @GetMapping("/radio/{stationuuid}")
    public ResponseEntity<RadioResponseDTO> getRadioById(@PathVariable String stationuuid) {
        RadioResponseDTO radio = radioService.getRadioById(stationuuid);

        if (radio == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(radio);
    }
}