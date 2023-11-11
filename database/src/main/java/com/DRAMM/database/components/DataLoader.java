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
        Sound sound1 = new Sound("Sound_1", 10, 40);
        soundRepository.save(sound1);

        Sound sound2 = new Sound("Sound_2", 50, 70);
        soundRepository.save(sound2);

        Sound sound3 = new Sound("Sound_3", 30, 90);
        soundRepository.save(sound3);
        System.out.println("Data loader running");
    }
}
