package com.hotel.MicroService_Reservation.controller;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.MicroService_Reservation.model.ReservationsDto;
import com.hotel.MicroService_Reservation.model.ReturnResponse;
import com.hotel.MicroService_Reservation.service.ReservationsService;
import com.hotel.MicroService_Reservation.utility.PDFGenerator;

@CrossOrigin(exposedHeaders = {HttpHeaders.CONTENT_DISPOSITION})
@RestController
@RequestMapping("/reservation")
public class ReservationController {

  

   @Autowired
   ReservationsService reservationsServiceImpl;

//   @Autowired
//	EmailService emailService;

    @GetMapping(value = "/test/docker")
    public String testHm() {


        return "Working properly!!";
    }




	@PostMapping(value = "/save/reservation")
	public ResponseEntity saveReservation(@RequestBody ReservationsDto reservationsDto) {

		reservationsServiceImpl.saveReservations(reservationsDto);
		
		ByteArrayInputStream bis = PDFGenerator.customerPDFReport(reservationsDto);
		String filename = "booking"+"-"+reservationsDto.getName()+".pdf";
		HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename="+filename);

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="+filename);
        header.add("Cache-Control", "no-cache, no-store, must-revalidate");
        header.add("Pragma", "no-cache");
        header.add("Expires", "0");
		//emailService.sendSimpleMessage(reservationsDto.getEmail(),"Booking Confirmation","Booking confirmed ");
        return ResponseEntity
                .ok()
                .headers(header)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
	}
	
	@GetMapping(value="/getAll/reservations")
    public ResponseEntity<List<ReservationsDto>> getAllReservations(){
		return new ResponseEntity(reservationsServiceImpl.getAllReservations(), HttpStatus.OK);
		
	}
	
	@GetMapping(value="/getreservation/byid/{id}")
    public ResponseEntity<ReservationsDto> findReservationById(@PathVariable String id){
		return new ResponseEntity(reservationsServiceImpl.findById(id), HttpStatus.OK);
		
	}
	
	@GetMapping(value="/findByroomNo/{roomNo}")
    public ResponseEntity<ReservationsDto> findReservationRoomNo(@PathVariable String roomNo){
		return new ResponseEntity(reservationsServiceImpl.findByRoomNo(roomNo), HttpStatus.OK);
		
	}
	
	@DeleteMapping(value="/deletereservations/byid/{id}")
    public ResponseEntity<String> deleteReservationsById(@PathVariable String id){
		String success=reservationsServiceImpl.deleteReservationsById(id);
		return new ResponseEntity(new ReturnResponse(success), HttpStatus.OK);
		
	}
	
}
