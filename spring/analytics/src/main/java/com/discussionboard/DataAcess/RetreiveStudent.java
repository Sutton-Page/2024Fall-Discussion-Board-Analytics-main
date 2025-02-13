package com.discussionboard.DataAcess;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.cglib.core.CollectionUtils;

import com.discussionboard.DataObject.Student;

public class RetreiveStudent {

    private final String query = "SELECT * FROM Student";
    private final String getStudentWithNoPosts = "SELECT Student.studentId FROM student "
                + "LEFT JOIN post on student.studentId = post.studentId and post.boardId = ?"
                + "GROUP BY student.studentId HAVING COUNT(post.postId) = 0";

    private final String getStudentWithNoReplies = "SELECT Student.studentId FROM student "
                + "LEFT JOIN replies on student.studentId = replies.studentId and replies.boardId = ?"
                + "GROUP BY student.studentId HAVING COUNT(replies.studentId) = 0";
    
    public ArrayList<Student> getStudentsWithNoPostsReplies(int boardId){

        ArrayList<Student> allStudents = getStudents();

        List<Integer> studentWithNoPost = DBAccesser.jdbcTemplate.query(getStudentWithNoPosts,ps -> ps.setInt(1, boardId), (rs, rowNum) -> {

            int studentId = rs.getInt("studentId");
            return studentId;
        });

        List<Integer> studentWithNoReplies = DBAccesser.jdbcTemplate.query(getStudentWithNoReplies,ps -> ps.setInt(1, boardId), (rs, rowNum) -> {

            int studentId = rs.getInt("studentId");
            return studentId;
        });

        Set<Integer> noPost = new HashSet<>(studentWithNoPost);
        Set<Integer> noReply = new HashSet<>(studentWithNoReplies);

     
        Set<Integer> studentWithNoReplyOrPost
            = noPost.stream()
                  .filter(noReply::contains)
                  .collect(Collectors.toSet());
        
        
        ArrayList<Student> allStudentsWithNoPostOrReply = new ArrayList<>();

        for(Student s: allStudents){

            if(studentWithNoReplyOrPost.contains(s.studentId)){

                allStudentsWithNoPostOrReply.add(s);
            }
        }
        

        return allStudentsWithNoPostOrReply;

        

        





    }
    
    public ArrayList<Student> getStudents(){
        List<Student> result = DBAccesser.jdbcTemplate.query(query, new StudentMapper());
        
        for (Student student : result) {
            if (!isValidUrl(student.icon, student)) {
                if (!isValidColor(student.color)) {
                    String newColor = generateRandomColor();
                    student.color = newColor;
                    DBAccesser.jdbcTemplate.update(
                        "UPDATE Student SET color = ? WHERE studentId = ?",
                        newColor, student.studentId
                    );
                }
            }
        }

        return (ArrayList<Student>) result;
    }

    
        public ArrayList<Student> getNonInteractingStudents(int discussionBoardId) {
            String nonInteractingQuery = 
                "SELECT DISTINCT s.* FROM Student s " +
                "LEFT JOIN Post p ON s.studentId = p.studentId AND p.discussionBoardId = ? " +
                "LEFT JOIN Reply r ON s.studentId = r.studentId AND r.discussionBoardId = ? " +
                "WHERE p.postId IS NULL AND r.replyId IS NULL";

            List<Student> result = DBAccesser.jdbcTemplate.query(
                nonInteractingQuery, 
                (rs, rowNum) -> new StudentMapper().mapRow(rs, rowNum),
                discussionBoardId, discussionBoardId
            );

            return new ArrayList<>(result);
        }
    
    
    private String generateRandomColor() {
        String letters = "0123456789ABCDEF";
        StringBuilder color = new StringBuilder("#");
        for (int i = 0; i < 6; i++) {
            color.append(letters.charAt((int) (Math.random() * 16)));
        }
        return color.toString();
    }

    private boolean isValidUrl(String url, Student student) {
        if (url == null || url.trim().isEmpty()) {
            return false;
        }
        try {
            new java.net.URL(url).toURI();
            student.color = "#FFFFFF";
            DBAccesser.jdbcTemplate.update(
                "UPDATE Student SET color = ? WHERE studentId = ?",
                "#FFFFFF", student.studentId
            );
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isValidColor(String color) {
        if (color == null || color.trim().isEmpty()) {
            return false;
        }
        if (!color.matches("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")) {
            return false;
        }
        try {
            String hex = color.replace("#", "");
            if (hex.length() == 3) {
                hex = String.format("%c%c%c%c%c%c", 
                    hex.charAt(0), hex.charAt(0),
                    hex.charAt(1), hex.charAt(1),
                    hex.charAt(2), hex.charAt(2));
            }
            int r = Integer.parseInt(hex.substring(0, 2), 16);
            int g = Integer.parseInt(hex.substring(2, 4), 16);
            int b = Integer.parseInt(hex.substring(4, 6), 16);
            return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
        } catch (NumberFormatException e) {
            return false;
        }
    }
    public Student getStudentById(int studentId) {
        String queryById = "SELECT studentId, name, icon, color FROM Student WHERE studentId = ?";
        List<Student> result = DBAccesser.jdbcTemplate.query(queryById, new StudentMapper(), studentId);
        
        if (!result.isEmpty()) {
            Student student = result.get(0);
            if (!isValidUrl(student.icon, student)) {
                if (!isValidColor(student.color)) {
                    String newColor = generateRandomColor();
                    student.color = newColor;
                    DBAccesser.jdbcTemplate.update(
                        "UPDATE Student SET color = ? WHERE studentId = ?",
                        newColor, studentId
                    );
                }
            }
            return student;
        }
        return null;
    }

}