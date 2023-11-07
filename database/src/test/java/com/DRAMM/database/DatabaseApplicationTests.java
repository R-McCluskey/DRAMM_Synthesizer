package com.DRAMM.database;

import com.DRAMM.database.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.DRAMM.database.repository.UserRepository;

import static org.junit.Assert.assertEquals;

@SpringBootTest
class DatabaseApplicationTests {

	@Autowired
	UserRepository userRepository;

	@Test
	void contextLoads() {
	}

	@Test
	public void createUserThenSave(){
		User matthew = new User("MatthewTest");
		userRepository.save(matthew);
	}


}
