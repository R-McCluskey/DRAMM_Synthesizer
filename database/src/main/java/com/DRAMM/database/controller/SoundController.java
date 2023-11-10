package com.DRAMM.database.controller;

import com.DRAMM.database.models.Sound;
import com.DRAMM.database.repository.SoundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SoundController {

    @Autowired
    SoundRepository soundRepository;

    @GetMapping(value = "/sounds")
    public ResponseEntity<List<Sound>> getAllSounds(){
        return new ResponseEntity<>(soundRepository.findAll(), HttpStatus.OK);
    }



}
