package com.hotel.MicroService_Head.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hotel.MicroService_Head.entityDao.Inventory;

@Repository
public interface InventoryRepository extends MongoRepository<Inventory, String>{

}
