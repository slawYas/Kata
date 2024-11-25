package com.exercice.katabackend.model;

import lombok.*;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KataResponse {
    private String transformedNumber;
}
