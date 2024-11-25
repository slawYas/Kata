package com.exercice.katabackend.service.impl;

import com.exercice.katabackend.exception.InvalidNumberException;
import com.exercice.katabackend.service.KataService;
import org.springframework.stereotype.Service;

@Service
public class KataServiceImpl implements KataService {

    @Override
    public String transformNumber(int number) {
        if (number < 0 || number > 100) {
            throw new InvalidNumberException();
        }

        final String numStr = String.valueOf(number);
        StringBuilder result = new StringBuilder();

        // Vérifie la divisibilité
        if (number % 3 == 0) result.append("FOO");
        if (number % 5 == 0) result.append("BAR");

        // Vérifie la présence de chiffres
        numStr.chars().mapToObj(c -> (char) c).forEach(c -> {
            if (c == '3') result.append("FOO");
            if (c == '5') result.append("BAR");
            if (c == '7') result.append("QUIX");
        });

        return result.isEmpty() ? numStr : result.toString();
    }
}
