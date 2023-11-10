package com.DRAMM.database.components;

import com.DRAMM.database.models.Sound;
import com.DRAMM.database.repository.SoundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("!test")
@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    SoundRepository soundRepository;

    public DataLoader(){
    }

    public void run(ApplicationArguments args){
        Sound sound1 = new Sound("Sound Name 1", 50, 30);
        soundRepository.save(sound1);

        Sound sound2 = new Sound("Sound Name 2", 10, 100);
        soundRepository.save(sound2);

        Sound sound3 = new Sound("Sound Name 3", 25, 75);
        soundRepository.save(sound3);
        System.out.println("Data loader running");
    }
}
