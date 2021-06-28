package com.hotel.MicroService_Head.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hotel.MicroService_Head.entityDao.User;

@Repository
public interface UserRepository extends MongoRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmpId(String email);
}
