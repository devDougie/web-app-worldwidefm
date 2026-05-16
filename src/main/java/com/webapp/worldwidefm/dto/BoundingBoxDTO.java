package com.webapp.worldwidefm.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BoundingBoxDTO {

    @NotNull
    private Double north;

    @NotNull
    private Double south;

    @NotNull
    private Double east;

    @NotNull
    private Double west;

    private Integer limit = 100;
}