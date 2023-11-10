package com.DRAMM.database;

import com.DRAMM.database.models.Sound;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.DRAMM.database.repository.SoundRepository;

import static org.junit.Assert.assertEquals;

@SpringBootTest
class DatabaseApplicationTests {

	@Autowired
	SoundRepository soundRepository;

	@Test
	void contextLoads() {
	}

	@Test
	public void createSoundThenSave(){
		Sound matthew = new Sound("MatthewTest", 50, 30);
		soundRepository.save(matthew);
	}


}
