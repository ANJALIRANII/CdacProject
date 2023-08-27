package com.app;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
	
	public String generateToken(ShopUser user) {
		Map<String,Object> info = new HashMap<String, Object>();
		info.put("name", user.getUsername());
		return createToken(info);
	}
	
	public String getTokenUsername(String token) {
		Claims claims = decodeToken(token);
		String email = claims.get("name", String.class);
		return email;
	}
	
	public boolean validateToken(String token, ShopUser user) {
		Claims claims = decodeToken(token);
		if(!claims.get("name").equals(user.getUsername()))
			return false;
		if(claims.getExpiration().before(new Date()))
			return false;
		return true;
	}

	private String createToken(Map<String, Object> info) {
		long curTime = System.currentTimeMillis();
		long expiration = 86400000;
		String secret = "peakautomotives";
		return Jwts.builder()
				.setSubject(null)
				.setClaims(info)
				.setIssuedAt(new Date(curTime))
				.setExpiration(new Date(curTime + expiration))
				.signWith(SignatureAlgorithm.HS256, secret)
				.compact();
	}
	
	private Claims decodeToken(String token) {
		String secret = "peakautomotives";
		return Jwts.parser()
			.setSigningKey(secret)
			.parseClaimsJws(token)
			.getBody();
	}	
}
