package com.exercice.katabackend.service.impl;

import com.exercice.katabackend.exception.InvalidNumberException;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class KataServiceImplTest {

    private final KataServiceImpl kataService = new KataServiceImpl();

    @Test
    void testTransformNumber_WhenNumberIsValid_ShouldReturnTransformedString() {
        // Given
        Map<Integer, String> testCases = Map.of(
                1, "1",
                3, "FOOFOO",
                5, "BARBAR",
                7, "QUIX",
                9, "FOO",
                51, "FOOBAR",
                53, "BARFOO",
                33, "FOOFOOFOO",
                15, "FOOBARBAR"
        );

        // When
        testCases.forEach((input, expected) -> {
            // Then
            assertEquals(expected, kataService.transformNumber(input));
        });
    }

    @Test
    void testTransformNumber_WhenNumberIsOutOfRange_ShouldThrowException() {
        // Given
        int negativeNumber = -1;
        int numberOutOfRange = 101;

        // When && Then
        assertThrows(InvalidNumberException.class, () -> kataService.transformNumber(negativeNumber));
        assertThrows(InvalidNumberException.class, () -> kataService.transformNumber(numberOutOfRange));
    }
}