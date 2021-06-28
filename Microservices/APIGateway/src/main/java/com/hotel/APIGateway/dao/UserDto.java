package com.hotel.APIGateway.dao;

import lombok.Builder;
import lombok.Data;


@Builder
@Data
public class UserDto {
    private long id;
    private String login;
    private String token;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public UserDto(long id, String login, String token) {
		super();
		this.id = id;
		this.login = login;
		this.token = token;
	}
	public UserDto() {
	}
	
    
    
}
