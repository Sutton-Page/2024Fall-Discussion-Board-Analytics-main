package com.discussionboard.DataObject;

public class Post {
    
    public int postId;
    public int boardId;
    public int studentId;
    public String content;

    // Constructor
    public Post(int postId, int boardId, int studentId, String content) {
        this.postId = postId;
        this.boardId = boardId;
        this.studentId = studentId;
        this.content = content;
    }
}
