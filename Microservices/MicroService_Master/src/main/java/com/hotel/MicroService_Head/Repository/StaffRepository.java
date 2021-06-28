package com.hotel.MicroService_Head.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hotel.MicroService_Head.entityDao.Staff;

@Repository
public interface StaffRepository extends MongoRepository<Staff, String>{

}
