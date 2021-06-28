package com.hotel.MicroService_Reservation.Dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hotel.MicroService_Reservation.entity.Reservations;

@Repository
public interface ReservationsRepository  extends MongoRepository<Reservations, String>{

    public Reservations findByRoomNo(String RoomNo);
}
