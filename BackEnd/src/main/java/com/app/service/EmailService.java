package com.app.service;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	
	@Value("${from}")
	private String from;
	
	@Value("${host}")
	private String host;
	
	@Value("${pass}")
	private String pass;
	
	public boolean sendEmail(String subject, String message, String to) {
		
		System.out.println("from "+from);
		boolean f=false;
//		String from="amankurmi777@gmail.com";
//		
//		String host="smtp.gmail.com";
		
		Properties properties=System.getProperties();
		
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", "465");
		properties.put("mail.smtp.ssl.enable", "true");
		properties.put("mail.smtp.auth", "true");
		
		
		// step 1: get session object of mail
		Session session=Session.getInstance(properties, new Authenticator() {
		
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(from, pass);
			}
		});
		
		session.setDebug(true);
		
		// step 2; compose the message
		MimeMessage m=new MimeMessage(session);
		try {
			m.setFrom(new InternetAddress(from));
			m.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
			m.setSubject(subject);
			m.setText(message);
			Transport.send(m);
			
			System.out.println("sent passage");
			f=true;
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return f;
	}

}
