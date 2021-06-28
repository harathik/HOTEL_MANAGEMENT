package com.hotel.MicroService_Head.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hotel.MicroService_Head.entityDao.Register;

@Repository
public interface RegisterRepository extends MongoRepository<Register, String>{

	public Register findByEmailAndPassword(String email, String password);
}
