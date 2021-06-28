package com.hotel.MicroService_Reservation.service;

import java.util.List;

import com.hotel.MicroService_Reservation.model.ReservationsDto;

public interface ReservationsService {

	public String saveReservations(ReservationsDto reservationsDto);
	
    public List<ReservationsDto> getAllReservations();
	
    public ReservationsDto findById(String id);
    
    public ReservationsDto findByRoomNo(String id);
	
	public String deleteReservationsById(String id);

	public Object testHm();
}
