package com.exercice.katabackend.exception;

public class InvalidNumberException extends RuntimeException {
    public InvalidNumberException() {
        super("Le nombre doit être compris entre 0 et 100 !");
    }
}
