package com.discussionboard.DataObject;

public class Reply {
    public int boardId;
    public int postId;
    public int replyId;
    public int studentId;
    public String content;

    public Reply(int boardId, int postId, int replyId, int studentId, String content) {
        this.boardId = boardId;
        this.postId = postId;
        this.replyId = replyId;
        this.studentId = studentId;
        this.content = content;
    }
}
