package com.DRAMM.database.components;

import com.DRAMM.database.models.User;
import com.DRAMM.database.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("!test")
@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    UserRepository userRepository;

    public DataLoader(){
    }

    public void run(ApplicationArguments args){
        User matthew = new User("MatthewDataLoader");
        userRepository.save(matthew);
        System.out.println("Data loader running");
    }
}
