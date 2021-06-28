package com.hotel.Security;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableEurekaClient
public class SecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecurityApplication.class, args);
	}
	@Bean
	@LoadBalanced
	public RestTemplate restTemplate(){
		return  new RestTemplate();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//	@Bean
//	public CommandLineRunner createAdmin(UserRepository userRepository,PasswordEncoder passwordEncoder){
//		return args -> {
//			Optional<User> optionalUser = userRepository.findByUsername("admin@admin.com");
//			if(!optionalUser.isPresent()){
//					saveAdmin(passwordEncoder,userRepository);
//			}
//		};
//	}
//
//	private void saveAdmin(PasswordEncoder passwordEncoder,UserRepository userRepository) {
//		User admin = new User();
//		admin.setUsername("admin@admin.com");
//		admin.setPassword(passwordEncoder.encode("administrator"));
//		admin.setRole(ClientType.Administrator.toString());
//		userRepository.save(admin);
//	}
}
