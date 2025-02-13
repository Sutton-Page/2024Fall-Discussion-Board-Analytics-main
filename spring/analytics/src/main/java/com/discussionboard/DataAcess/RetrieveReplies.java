package com.discussionboard.DataAcess;


import java.util.ArrayList;
import java.util.List;

import com.discussionboard.DataObject.Reply;
import com.discussionboard.DataObject.ReplyData;

public class RetrieveReplies {
    public ArrayList<Reply> getRepliesByPostId(int postId) {
        String sql = "SELECT  boardId, postId, replyId, studentId, content FROM Replies WHERE postId = ?";
        List<Reply> replies = DBAccesser.jdbcTemplate.query(sql, new ReplyMapper(), postId);
        return new ArrayList<>(replies);
    }

    public ArrayList<ReplyData> getRepliesByPostIdCombined(int postId){

        String sql = "SELECT student.name, student.icon, student.color, Replies.content " ;
        sql+= " FROM Replies INNER JOIN student ON Replies.studentId = student.studentId ";
        sql+= " WHERE Replies.postId = ?";

        List<ReplyData> replies = DBAccesser.jdbcTemplate.query(sql, ps -> ps.setInt(1, postId), (rs, rowNum) -> {

            
            String name = rs.getString("name");
            String icon = rs.getString("icon");
            String color = rs.getString("color");
            String content = rs.getString("content");

           ReplyData temp = new ReplyData(name,icon,color,content);



           return temp;
            
        });

        return (ArrayList<ReplyData>) replies;
    }

    public ArrayList<Reply> getRepliesByBoardId(int boardId) {
        String sql = "SELECT  boardId, postId, replyId, studentId, content FROM Replies WHERE boardId = ?";
        List<Reply> replies = DBAccesser.jdbcTemplate.query(sql, new ReplyMapper(), boardId);
        return new ArrayList<>(replies);
    }

    public ArrayList<Reply> getAllReplies() {
        String sql = "SELECT  boardId, postId, replyId, studentId, content FROM Replies";
        List<Reply> replies = DBAccesser.jdbcTemplate.query(sql, new ReplyMapper());
        return new ArrayList<>(replies);
    }

}