package com.discussionboard.DataObject;

public class PostReplies {

    public int studentId;
    public int postId;
    public String postContent;
    public String replyContent;


    public PostReplies(int studentId, String postContent, String replyContent, int postId) {
        this.studentId = studentId;
        this.postContent = postContent;
        this.replyContent = replyContent;
        this.postId = postId;
    }

    

    
    
}
