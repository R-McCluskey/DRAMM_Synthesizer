package com.DRAMM.database.repository;

import com.DRAMM.database.models.Sound;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoundRepository extends MongoRepository<Sound, String> {

}
