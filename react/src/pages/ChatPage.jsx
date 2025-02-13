import React from "react";
import Card from "../components/Card";

const ChatPage = ({
  boardId,
  targetPostId,
  studentId,
  isUserPosts,
  onReplySubmitted,
}) => {
  return (
    <Card
      boardId={boardId}
      targetPostId={targetPostId}
      studentId={studentId}
      isUserPosts={isUserPosts}
      onReplySubmitted={onReplySubmitted}
    />
  );
};

export default ChatPage;
