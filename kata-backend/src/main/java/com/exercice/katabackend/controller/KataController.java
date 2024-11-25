package com.exercice.katabackend.controller;

import com.exercice.katabackend.model.KataResponse;
import com.exercice.katabackend.service.KataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/kata")
public class KataController {

    private final KataService kataService;

    @Autowired
    public KataController(KataService kataService) {
        this.kataService = kataService;
    }

    @GetMapping("transform/{number}")
    @ResponseStatus(HttpStatus.OK)
    public KataResponse transformNumber(@PathVariable int number) {
        final String transformedNumber = kataService.transformNumber(number);
        return KataResponse.builder()
                .transformedNumber(transformedNumber)
                .build();
    }
}
