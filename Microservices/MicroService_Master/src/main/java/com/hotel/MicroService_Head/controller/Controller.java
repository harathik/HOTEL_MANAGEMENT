package com.hotel.MicroService_Head.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.MicroService_Head.Dto.CategoryDto;
import com.hotel.MicroService_Head.Dto.InventoryDto;
import com.hotel.MicroService_Head.Dto.RegisterDto;
import com.hotel.MicroService_Head.Dto.ReturnResponse;
import com.hotel.MicroService_Head.Dto.RoomDto;
import com.hotel.MicroService_Head.Dto.StaffDto;
import com.hotel.MicroService_Head.Repository.CategoryRepository;
import com.hotel.MicroService_Head.entityDao.Category;
import com.hotel.MicroService_Head.service.InventoryService;
import com.hotel.MicroService_Head.service.RegisterService;
import com.hotel.MicroService_Head.service.RoomService;
import com.hotel.MicroService_Head.service.StaffService;


@RestController
@RequestMapping("/hotel")
public class Controller {
	   
	 @Autowired
	   StaffService staffServiceImpl;
	   
	   @Autowired
	   RoomService roomServiceImpl;

		@Autowired
		CategoryRepository categoryRepository;
	   
	   @Autowired
	   RegisterService registerServiceImpl;
	   
	   @Autowired
	   InventoryService inventoryServiceImpl;


	   @ExceptionHandler(value = Exception.class)
		public ResponseEntity<Object> exception(Exception e) {

			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	    @GetMapping(value = "/test")
	    public String testHm() {


	        return "Head serice is working ";
	    }
	    
		@PostMapping(value = "/save/staff")
		public ResponseEntity<String> saveStaff(@RequestBody StaffDto staffDto) {

			return new ResponseEntity(staffServiceImpl.saveStaff(staffDto), HttpStatus.OK);
		}
		
		@PostMapping(value = "/save/room")
		public ResponseEntity<String> saveRoom(@RequestBody RoomDto roomDto) {
			
			return new ResponseEntity(roomServiceImpl.saveRoom(roomDto), HttpStatus.OK);
		}
		@PostMapping(value = "/save/category")
		public ResponseEntity<String> saveCategory(@RequestBody Category category) {

			return new ResponseEntity(categoryRepository.save(category), HttpStatus.OK);
		}

	        @PutMapping(value = "/update/room")
		public ResponseEntity<String> updateRoom(@RequestBody RoomDto roomDto) {


			return new ResponseEntity(new ReturnResponse(roomServiceImpl.updateRoom(roomDto)), HttpStatus.OK);
		}

		@PutMapping(value = "/update/category")
		public ResponseEntity<String> updateCategory(@RequestBody Category category) {
			Optional<Category> existing = categoryRepository.findById(category.getId());
			if(existing.isPresent()){
				Category saved = categoryRepository.save(category);
				return new ResponseEntity(new ReturnResponse(saved.getName()), HttpStatus.OK);
			}
			return new ResponseEntity( new ReturnResponse("Category not found"), HttpStatus.OK);
		}
		
		@PostMapping(value = "/save/register")
		public ResponseEntity<String> saveEmployee(@RequestBody RegisterDto registerDto) {
			
			return new ResponseEntity(registerServiceImpl.saveEmployee(registerDto), HttpStatus.OK);
		}
		
		@PostMapping(value = "/save/inventory")
		public ResponseEntity<String> saveInventory(@RequestBody InventoryDto inventoryDto) {
			
			return new ResponseEntity( new ReturnResponse(inventoryServiceImpl.saveInventory(inventoryDto)), HttpStatus.OK);
		}
	    @PutMapping(value = "/update/inventory")
	    public ResponseEntity<String> updateInventory(@RequestBody InventoryDto inventoryDto) {
	        Optional<InventoryDto> existing = Optional.ofNullable(inventoryServiceImpl.findById(inventoryDto.getId()));
	        if(existing.isPresent()){
	            String saved = inventoryServiceImpl.saveInventory(inventoryDto);
	            return new ResponseEntity(new ReturnResponse(saved), HttpStatus.OK);
	        }
	        return new ResponseEntity( new ReturnResponse("Category not found"), HttpStatus.OK);
	    }
		
		@GetMapping(value="/search/rooms/{checkin}/{checkout}")
		public ResponseEntity<List<RoomDto>> searchRooms(@PathVariable String checkin, @PathVariable String checkout) throws ParseException {
	   	   SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
			Date requiredCheckin = simpleDateFormat.parse(checkin);
			Date requiredCheckout = simpleDateFormat.parse(checkout);
			return new ResponseEntity(roomServiceImpl.searchRooms(requiredCheckin, requiredCheckout), HttpStatus.OK);
			
		}
		
		@GetMapping(value="/getAll/rooms")
	    public ResponseEntity<List<RoomDto>> getAllRooms(){
			return new ResponseEntity(roomServiceImpl.getAllRooms(), HttpStatus.OK);
			
		}
		@GetMapping(value="/getAll/categories")
		public ResponseEntity<List<CategoryDto>> getAllCategories(){
			return new ResponseEntity(categoryRepository.findAll(), HttpStatus.OK);

		}
		
		@GetMapping(value="/getAll/staff")
	    public ResponseEntity<List<StaffDto>> getAllStaff(){
			return new ResponseEntity(staffServiceImpl.getAllStaff(), HttpStatus.OK);
			
		}
		
		@GetMapping(value="/getstaff/byid/{id}")
	    public ResponseEntity<StaffDto> findStaffById(@PathVariable String id){
			return new ResponseEntity(staffServiceImpl.findById(id), HttpStatus.OK);
			
		}
		
		@DeleteMapping(value="/deletestaff/byid/{id}")
	    public ResponseEntity<String> deleteStaffById(@PathVariable String id){
			String success=staffServiceImpl.deleteStaffById(id);
			return new ResponseEntity(new ReturnResponse(success), HttpStatus.OK);
			
		}
		@DeleteMapping(value="/deleteCategory/byid/{id}")
		public ResponseEntity<String> deleteCategoryById(@PathVariable String id){
			categoryRepository.deleteById(id);
			return new ResponseEntity(new ReturnResponse(id), HttpStatus.OK);

		}
		
		@GetMapping(value="/getroom/byid/{id}")
	    public ResponseEntity<StaffDto> findRoomById(@PathVariable String id){
			return new ResponseEntity(roomServiceImpl.findById(id), HttpStatus.OK);
			
		}
		
		@DeleteMapping(value="/deleteroom/byid/{id}")
	    public ResponseEntity<String> deleteRoomById(@PathVariable String id){
			String success=roomServiceImpl.deleteRoomById(id);
			return new ResponseEntity(new ReturnResponse(success), HttpStatus.OK);
			
		}
		
		@GetMapping(value="/getAll/inventory")
	    public ResponseEntity<List<InventoryDto>> getAllInventory(){
			return new ResponseEntity(inventoryServiceImpl.getAllInventory(), HttpStatus.OK);
			
		}
		
		@GetMapping(value="/getinventory/byid/{id}")
	    public ResponseEntity<StaffDto> findInventoryById(@PathVariable String id){
			return new ResponseEntity(inventoryServiceImpl.findById(id), HttpStatus.OK);
			
		}
		
		@DeleteMapping(value="/deleteinventory/byid/{id}")
	    public ResponseEntity<String> deleteInventoryById(@PathVariable String id){
			String success=inventoryServiceImpl.deleteInventoryById(id);
			return new ResponseEntity(new ReturnResponse(success), HttpStatus.OK);
			
		}

		@GetMapping(value="/getAll/registerd")
	    public ResponseEntity<List<RegisterDto>> getAllRegistered(){
			return new ResponseEntity(registerServiceImpl.getAllRegistered(), HttpStatus.OK);
			
		}
		
		@GetMapping(value="/getregistered/byid/{id}")
	    public ResponseEntity<RegisterDto> findRegisterById(@PathVariable String id){
			return new ResponseEntity(registerServiceImpl.findById(id), HttpStatus.OK);
			
		}
		
		@DeleteMapping(value="/deleteregistered/byid/{id}")
	    public ResponseEntity<String> deleteRegisteredById(@PathVariable String id){
			String success=registerServiceImpl.deleteRegisterById(id);
			return new ResponseEntity(new ReturnResponse(success), HttpStatus.OK);
			
		}
		@PostMapping(value="/check/validuser/{email}/{password}")
	    public ResponseEntity<RegisterDto> findRegisterById(@PathVariable String email,@PathVariable String password){
			return new ResponseEntity(registerServiceImpl.findByEmailAndPassword(email, password), HttpStatus.OK);
			
		}
		
}
