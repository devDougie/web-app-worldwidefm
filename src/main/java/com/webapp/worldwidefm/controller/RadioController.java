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
    public ResponseEntity<List<RadioResponseDTO>> getRadios() {
        List<RadioResponseDTO> radios = radioService.getAllRadiosWithGeoInfo();
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