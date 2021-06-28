package com.hotel.MicroService_Head.service;

import java.util.List;

import com.hotel.MicroService_Head.Dto.RegisterDto;

public interface RegisterService {

    public String saveEmployee(RegisterDto registerDto);
	
	public List<RegisterDto> getAllRegistered();
	
	public RegisterDto findById(String id);
	
	public String deleteRegisterById(String id);
	
	public RegisterDto findByEmailAndPassword(String email, String password);
}
