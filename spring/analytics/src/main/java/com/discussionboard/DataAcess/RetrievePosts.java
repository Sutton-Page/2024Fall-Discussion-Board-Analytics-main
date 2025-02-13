package com.discussionboard.DataAcess;


import java.util.ArrayList;
import java.util.List;

import com.discussionboard.DataObject.Post;
//import com.discussionboard.database.DatabaseConnection;  // Assume this manages DB connections
import com.discussionboard.DataObject.Student;
import com.discussionboard.DataObject.StudentMetric;

public class RetrievePosts {
    private static final String GET_POSTS_BY_BOARD_ID = "SELECT * FROM Post WHERE boardId = ?";
    private static final String getNumberOfPostsMadeByStudent = "select count(*) from post where boardId = ? and studentId = ?";

    public ArrayList<StudentMetric> getNumberOfPostsByUsers(int boardId){

            RetreiveStudent studentHandle = new RetreiveStudent();
            ArrayList<Student> students = studentHandle.getStudents();

            ArrayList<StudentMetric> studentMetrics = new ArrayList<>();

            for(Student s: students){

                int result = getNumberOfPostsByStudent(boardId,s.studentId);
                StudentMetric metric = new StudentMetric(s.studentId,s.name,s.icon,s.color,result,0);

                studentMetrics.add(metric);
            }


            return studentMetrics;

    }

    public int getNumberOfPostsByStudent(int boardId, int studentId) {
        return DBAccesser.jdbcTemplate.query(
            getNumberOfPostsMadeByStudent,
            ps -> {
                ps.setInt(1, boardId);
                ps.setInt(2, studentId);
            },
            rs -> {
                if (rs.next()) {
                    return rs.getInt(1);
                } else {
                    return 0; 
                }
            }
        );
    }
    

    public ArrayList<Post> getPostsByStudentId(int studentId) {
        String sql = "SELECT postId, boardId, studentId, content FROM Post WHERE studentId = ?";
        List<Post> posts = DBAccesser.jdbcTemplate.query(sql, new PostMapper(), studentId);
        return new ArrayList<>(posts);
    }

    public ArrayList<Post> getPostsByBoardId(int boardId) {
        List<Post> posts = DBAccesser.jdbcTemplate.query(
            GET_POSTS_BY_BOARD_ID,
            ps -> ps.setInt(1, boardId),
            new PostMapper()
        );
        return new ArrayList<>(posts);
    }

    public Post getPostById(int postId) {
        String sql = "SELECT postId, boardId, studentId, content FROM Post WHERE postId = ?";
        Post post = DBAccesser.jdbcTemplate.queryForObject(sql, new PostMapper(), postId);
        return post;
    }

    public ArrayList<Post> getPostsByStudentIdAndBoardId(int studentId, int boardId) {
        String sql = "SELECT postId, boardId, studentId, content FROM Post WHERE studentId = ? AND boardId = ?";
        List<Post> posts = DBAccesser.jdbcTemplate.query(sql, new PostMapper(), studentId, boardId);
        return new ArrayList<>(posts);
    }

    public ArrayList<Post> getAllPosts() {
        String sql = "SELECT postId, boardId, studentId, content FROM Post";
        List<Post> posts = DBAccesser.jdbcTemplate.query(sql, new PostMapper());
        return new ArrayList<>(posts);
    }
    
}