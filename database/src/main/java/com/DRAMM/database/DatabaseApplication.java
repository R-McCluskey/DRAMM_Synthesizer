package com.DRAMM.database;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import com.DRAMM.database.repository.SoundRepository;

@SpringBootApplication
@EnableMongoRepositories(basePackageClasses = SoundRepository.class)
public class DatabaseApplication {

	public static void main(String[] args) {
		SpringApplication.run(DatabaseApplication.class, args);
	}

}
