package com.hotel.MicroService_Head;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

@CrossOrigin
@SpringBootApplication
@EnableEurekaClient
public class MicroServiceHeadApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroServiceHeadApplication.class, args);
	}
	
	 @Bean
	 @LoadBalanced
	public RestTemplate restTemplate(){
		return new RestTemplate();
	}
}
