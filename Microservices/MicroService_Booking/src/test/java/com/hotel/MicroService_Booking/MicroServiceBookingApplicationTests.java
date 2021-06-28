package com.hotel.MicroService_Booking;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hotel.MicroService_Reservation.model.ReturnResponse;
import com.hotel.MicroService_Reservation.service.ReservationsService;

@SpringBootTest
class MicroServiceBookingApplicationTests {

	 @Mock
	    ReservationsService reservationsServiceImpl;

	@Test
	void contextLoads() {
		  Assert.assertEquals("Docker set up done!!",reservationsServiceImpl.testHm());
	}
	 @Test
	    public void testDeleteReservationsById(){
	        Mockito.when(reservationsServiceImpl.deleteReservationsById(Mockito.anyString())).thenReturn("Success");
	        Assert.assertEquals(new ResponseEntity(new ReturnResponse("Success"), HttpStatus.OK),
	        		reservationsServiceImpl.deleteReservationsById(Mockito.anyString()));
	    }
}
