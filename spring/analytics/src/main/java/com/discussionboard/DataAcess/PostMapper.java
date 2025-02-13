package com.discussionboard.DataAcess;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.discussionboard.DataObject.Post;

public class PostMapper implements RowMapper<Post> {

    @Override
    public Post mapRow(ResultSet rs, int rowNum) throws SQLException {
        int postId = rs.getInt("postId");
        int boardId = rs.getInt("boardId");
        int studentId = rs.getInt("studentId");
        String content = rs.getString("content");

        Post post = new Post(postId, boardId, studentId, content);

        return post;
    }
}