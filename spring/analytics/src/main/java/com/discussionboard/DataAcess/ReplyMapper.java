package com.discussionboard.DataAcess;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.discussionboard.DataObject.Reply;

public class ReplyMapper implements RowMapper<Reply>{


    @Override
    public Reply mapRow(ResultSet rs, int rowNum) throws SQLException {

        int boardId = rs.getInt("boardId");
        int postId = rs.getInt("postId");
        int replyId = rs.getInt("replyId");
        int studentId = rs.getInt("studentId");
        String content = rs.getString("content");

        Reply reply = new Reply(boardId, postId, replyId, studentId, content);

        return reply;   
    }
}