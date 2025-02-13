package com.discussionboard.analytics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

import com.discussionboard.DataAcess.DBAccesser;


@SpringBootApplication
public class AnalyticsApplication implements ApplicationRunner{

	
	@Autowired
    public JdbcTemplate jdbctemplate;

	public static void main(String[] args) {
		SpringApplication.run(AnalyticsApplication.class, args);
	}


	@Override
	public void run(ApplicationArguments arg) {

		DBAccesser dbAccesser = new DBAccesser(jdbctemplate);


	}

}
