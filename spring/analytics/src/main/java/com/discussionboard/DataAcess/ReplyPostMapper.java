package com.discussionboard.DataAcess;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import com.discussionboard.DataObject.PostReplies;

public class ReplyPostMapper implements RowMapper<PostReplies> {

    @Override
    public PostReplies mapRow(ResultSet rs, int rowNum) throws SQLException {


        int studentId = rs.getInt("reply_student_id");
        String postContent = rs.getString("post_content");
        String replyContent = rs.getString("reply_content");
        int postId = rs.getInt("postId");

        PostReplies pr = new PostReplies(studentId, postContent, replyContent,postId);

        return pr;
        
    }

    
}