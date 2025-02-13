package com.discussionboard.DataAcess;


import java.util.ArrayList;
import java.util.List;

import com.discussionboard.DataObject.Discussion;
//import com.discussionboard.database.DatabaseConnection;  // Assume this manages DB connections

public class RetrieveDiscussions {

    

    public ArrayList<Discussion> getAllDiscussions() {
        String sql = "SELECT boardId, name FROM Board";
        List<Discussion> discussions = DBAccesser.jdbcTemplate.query(sql, new DiscussionMapper());

        return new ArrayList<>(discussions);
    }

    public Discussion getDiscussionById(int boardId) {
        String sql = "SELECT boardId, name FROM Board WHERE boardId = ?";
        List<Discussion> discussions = DBAccesser.jdbcTemplate.query(sql, new DiscussionMapper(), boardId);
        
        return discussions.isEmpty() ? null : discussions.get(0);
    }
    
}