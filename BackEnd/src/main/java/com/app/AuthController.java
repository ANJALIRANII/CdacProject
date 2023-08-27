package com.app;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.Userrepo;
import com.app.dto.AuthResponseDto;
import com.app.dto.UserDto;
import com.app.entities.User;
import com.app.service.ServiceInterface;

@CrossOrigin
@RestController
public class AuthController {
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private JwtUtil jwtUtils;
	
	@Autowired
	private ServiceInterface service;
	
	@Autowired
	ModelMapper mapper;

	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody Credentials cred) {
		try {
			Authentication auth = new UsernamePasswordAuthenticationToken(cred.getEmail(), cred.getPassword());
			auth = authManager.authenticate(auth);
			ShopUser user = (ShopUser) auth.getPrincipal();
			String token = jwtUtils.generateToken(user);
			System.out.println(token);
			UserDto userfromdb=service.findByEmail(cred.getEmail());
			
			return ResponseEntity.ok(new AuthResponseDto(userfromdb,token));
		}catch (BadCredentialsException e) {
			return ResponseEntity.notFound().build();
		}
	}
}
