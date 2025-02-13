package com.discussionboard.DataAcess;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.discussionboard.DataObject.Student;

public class StudentMapper implements RowMapper<Student>{


    public Student mapRow(ResultSet rs, int rowNum) throws SQLException {

        int studentId = rs.getInt("studentId");
        String name = rs.getString("name");
        String icon = rs.getString("icon");
        String color = rs.getString("color");

        Student stud = new Student(studentId, name, icon, color);

        return stud;

        
    }
    
}
