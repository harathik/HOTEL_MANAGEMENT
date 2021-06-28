package com.hotel.MicroService_Head.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.MicroService_Head.Dto.InventoryDto;
import com.hotel.MicroService_Head.Repository.InventoryRepository;
import com.hotel.MicroService_Head.entityDao.Inventory;
import com.hotel.MicroService_Head.service.InventoryService;

@Service
public class InventoryServiceImpl implements InventoryService {

	@Autowired
	InventoryRepository inventoryRepository;
	
	public String saveInventory(InventoryDto inventoryDto) {
		
		Inventory inventory = new Inventory(inventoryDto.getId(),inventoryDto.getName(), inventoryDto.getQuantity(),inventoryDto.getPrice());

		Inventory savedInventory = inventoryRepository.save(inventory);
		
		return savedInventory.getId();
	}
	
	
	public List<InventoryDto> getAllInventory(){
		
		List<Inventory> inventoryList= inventoryRepository.findAll();
		
		List<InventoryDto> result = new ArrayList<InventoryDto>();
		if(!inventoryList.isEmpty()) {
			for(Inventory s:inventoryList){
				InventoryDto inventoryDto = new InventoryDto(s.getId(),s.getName(), s.getQuantity(),s.getPrice());
				result.add(inventoryDto);
			}
		}
	return result;
	}
	
	public InventoryDto findById(String id) {
		
		InventoryDto inventoryDto = null;
		Optional<Inventory> inventory = inventoryRepository.findById(id);
		
		if(inventory.isPresent()) {
			Inventory s =inventory.get();
			inventoryDto = new InventoryDto(s.getId(),s.getName(), s.getQuantity(),s.getPrice());
		}
		
	    return inventoryDto;	
	
	}
	
	public String deleteInventoryById(String id) {
		inventoryRepository.deleteById(id);
		return id;
	}


}
