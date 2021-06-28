package com.hotel.MicroService_Head.service;

import java.util.List;

import com.hotel.MicroService_Head.Dto.StaffDto;

public interface StaffService {

	public String saveStaff(StaffDto staffDto);
	
	public List<StaffDto> getAllStaff();
	
	public StaffDto findById(String id);
	
	public String deleteStaffById(String id);

	public String updateStaff(StaffDto staffDto);
}
