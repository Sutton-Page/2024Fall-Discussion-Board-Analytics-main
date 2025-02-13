package com.discussionboard.DataAcess;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import com.discussionboard.DataObject.Discussion;

public class DiscussionMapper implements RowMapper<Discussion> {

    @Override
    public Discussion mapRow(ResultSet rs, int rowNum) throws SQLException {
        int boardId = rs.getInt("boardId");
        String name = rs.getString("name");

        return new Discussion(boardId, name);
    }
}
