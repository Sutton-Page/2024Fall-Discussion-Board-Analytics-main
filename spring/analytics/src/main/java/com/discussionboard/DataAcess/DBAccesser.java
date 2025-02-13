package com.discussionboard.DataAcess;

import org.springframework.jdbc.core.JdbcTemplate;

public class DBAccesser {
    
    public static JdbcTemplate jdbcTemplate;

    public DBAccesser( JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

}