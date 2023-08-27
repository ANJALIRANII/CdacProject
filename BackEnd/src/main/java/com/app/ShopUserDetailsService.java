package com.app;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.dao.Userrepo;
import com.app.entities.User;

@Transactional
@Service
public class ShopUserDetailsService implements UserDetailsService {
	@Autowired
	private Userrepo userDao;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("in load UserByUserName");
		User user = userDao.findByEmail(email);
		if(user == null)
			throw new UsernameNotFoundException(email + " not found.");
		return new ShopUser(user);
	}
}