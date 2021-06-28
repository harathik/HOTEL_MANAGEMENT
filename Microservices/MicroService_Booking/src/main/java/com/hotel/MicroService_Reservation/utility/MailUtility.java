package com.hotel.MicroService_Reservation.utility;

import java.io.File;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;

@Component
public class MailUtility {

	
	@Autowired
	private JavaMailSender mailSender;
	 
	public void sendMailWithAttchment(final String to,final String subject,final String fileToAttach,final String filename) 
	{
	    MimeMessagePreparator preparator = new MimeMessagePreparator() 
	    {
	        public void prepare(MimeMessage mimeMessage) throws Exception 
	        {
	            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
	            mimeMessage.setFrom(new InternetAddress("admin@gmail.com"));
	            mimeMessage.setSubject(subject);
	             
	            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
	             
	            helper.setText("<html><body><img src='cid:identifier1234'></body></html>", true);
	             
	            FileSystemResource res = new FileSystemResource(new File(fileToAttach));
	            helper.addAttachment(filename, res);
	        }
	    };
	     
	    try {
	        mailSender.send(preparator);
	    }
	    catch (MailException ex) {
	        // simply log it and go on...
	        System.err.println(ex.getMessage());
	    }
	}
}
