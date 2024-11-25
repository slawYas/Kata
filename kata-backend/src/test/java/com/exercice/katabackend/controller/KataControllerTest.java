package com.exercice.katabackend.controller;

import com.exercice.katabackend.model.KataResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class KataControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void testTransformNumber_GivenNumberValid_WhenTransforming_ThenReturnTransformedValue() {
        // Given
        int number = 15;

        // When
        ResponseEntity<KataResponse> response = restTemplate.getForEntity("/api/v1/kata/transform/" + number, KataResponse.class);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("FOOBARBAR", response.getBody().getTransformedNumber());
    }

    @Test
    void testTransformNumber_GivenNumberIsOutOfRange_WhenTransforming_ThenReturnBadRequest() {
        // Given
        int number = 101;

        // When
        ResponseEntity<String> response = restTemplate.getForEntity("/api/v1/kata/transform/" + number, String.class);

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}