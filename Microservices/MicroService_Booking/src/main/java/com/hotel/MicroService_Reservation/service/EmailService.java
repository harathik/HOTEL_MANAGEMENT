package com.hotel.MicroService_Reservation.service;

public interface EmailService {
    public void sendSimpleMessage(
            String to, String subject, String text);
}
