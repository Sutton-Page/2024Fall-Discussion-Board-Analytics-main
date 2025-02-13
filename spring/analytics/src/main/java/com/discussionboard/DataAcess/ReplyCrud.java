package com.discussionboard.DataAcess;

import org.springframework.dao.DataAccessException;

import com.discussionboard.DataObject.Reply;

public class ReplyCrud {
    
    private String insert = "INSERT INTO Replies(replyId,boardId,postId,studentId,content) VALUES(?,?,?,?,?)";


    public int getMaxReplyId(String columnName){

        String q = "SELECT MAX( " + columnName + ") FROM Replies";

        return DBAccesser.jdbcTemplate.queryForObject(q,Integer.class);
    }

    public Reply addReply(Reply newReply) throws DataAccessException{

        int newReplyId = getMaxReplyId("replyId") + 1;

        int affectedRows = DBAccesser.jdbcTemplate.update(insert,
        newReplyId,newReply.boardId,newReply.postId,newReply.studentId,newReply.content);

        return newReply;
    }
}
