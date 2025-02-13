package com.discussionboard.DataAcess;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;

import com.discussionboard.DataObject.GradeDataHolder;
import com.discussionboard.DataObject.GraphMap;
import com.discussionboard.DataObject.PostReplies;
import com.discussionboard.DataObject.Reply;
import com.discussionboard.DataObject.Student;

public class Backend {

    public String countPostbyStudent = "SELECT count(*) from Post where studentId = ? AND boardId = ?";
    public String countRepliesByStudent = "SELECT count(*) from Replies where studentId = ? AND boardId = ?";
    
    public String queryRepliesOnPost = "SELECT Replies.studentId AS reply_student_id," + 
                "Post.content AS post_content,Replies.content AS reply_content, Post.postId as post_id FROM  Replies " +
                "INNER JOIN  Post ON Replies.postId = Post.postId WHERE   Replies.boardId = ?";
    

    public String getReplyMap = "SELECT Replies.studentId AS source_id, Post.studentId AS target_id " +
                "FROM Replies " + "INNER JOIN Post ON Replies.postId = Post.postId " +
                "WHERE Post.boardId = ?";
    
    public String getPostContentByBoard = "SELECT content FROM Post where boardId = ?";
    public String getReplyContentByBoard = "SELECT content FROM Replies where boardId = ?";

    public ArrayList<String> getAllPostTextByBoard(int boardId){

        List<String> postContents = DBAccesser.jdbcTemplate.query(getPostContentByBoard,  ps -> ps.setInt(1, boardId),  (rs, rowNum) -> {

            
            String postContent = rs.getString("content");
            return postContent;
            
        });

        return (ArrayList<String>) postContents;


    }

    public ArrayList<String> getAllReplyTextByBoard(int boardId){

        List<String> replyContent = DBAccesser.jdbcTemplate.query(getReplyContentByBoard,  ps -> ps.setInt(1, boardId),  (rs, rowNum) -> {

            
            String postContent = rs.getString("content");
            return postContent;
            
        });

        return (ArrayList<String>) replyContent;

    }

    
    
    public GradeDataHolder retrieveGradeInfo(int boardId){

        RetreiveStudent studentHandle = new RetreiveStudent();
        ArrayList<Student> studentData = studentHandle.getStudents();
        
        ArrayList<HashMap<Integer,Integer>> studentActivityData = this.studentMadePost(boardId);
        ArrayList<GraphMap> graphData = this.getGraphData(boardId);
        Map<Integer,List<PostReplies>> postRepliesData = this.getPostReplyContent(boardId);

        GradeDataHolder finalData = new GradeDataHolder(studentActivityData, graphData, postRepliesData,studentData);


        return finalData;
        


    }

    public ArrayList<HashMap<Integer,Integer>> studentMadePost(int boardId){

        RetreiveStudent studentHandle = new RetreiveStudent();
        ArrayList<Student> students = studentHandle.getStudents();

        HashMap<Integer,Integer> studentMadePost = new HashMap<>();
        HashMap<Integer,Integer> studentMadeReply = new HashMap<>();

        for(Student s: students){

            int studentId = s.studentId;
            int postByStudent =DBAccesser.jdbcTemplate.queryForObject(countPostbyStudent,Integer.class,studentId,boardId);
            int repliesByStudent = DBAccesser.jdbcTemplate.queryForObject(countRepliesByStudent,Integer.class,studentId,boardId);

            if(postByStudent >= 1){

                studentMadePost.put(s.studentId,1);
            } else{

                studentMadePost.put(s.studentId,0);
            }

            if(repliesByStudent >= 1){

                studentMadeReply.put(s.studentId,1);

            } else{

                studentMadeReply.put(s.studentId,0);
            }


        }

        ArrayList<HashMap<Integer,Integer>> holder = new ArrayList<>();

        holder.add(studentMadePost);
        holder.add(studentMadeReply);

        return holder;
    }

    public Map<Integer,List<PostReplies>> getPostReplyContent(int boardId){

        
        List<PostReplies> results = DBAccesser.jdbcTemplate.query(queryRepliesOnPost,  ps -> ps.setInt(1, boardId),new ReplyPostMapper());
        

        Map<Integer, List<PostReplies>> groupedReplies = results.stream()
            .collect(Collectors.groupingBy(reply -> reply.postId));

        
        return groupedReplies;


    }

    public ArrayList<GraphMap> getGraphData(int boardId){

        List<GraphMap> graphMapping = DBAccesser.jdbcTemplate.query(getReplyMap,  ps -> ps.setInt(1, boardId),  (rs, rowNum) -> {

            
            int source = rs.getInt("source_id");
            int dest = rs.getInt("target_id");

            return new GraphMap(source,dest);

            
        });

        return (ArrayList<GraphMap>) graphMapping;


    }







    
}
