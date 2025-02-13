import React from "react";
import "../styles/replybutton.css";
import ReplyButtons from "../components/ReplyButtons";

function ReplyButtonPage() {
  var boardId = 0;
  var targetPostId = 0;
  var studentId = 5;

  return (
    <div className="App">
      <h1>Reply Buttons</h1>
      <div className="post">
        <h2>Title of the Post</h2>
        <p>"Discussion Post Placeholder"</p>
        <ReplyButtons
          boardId={boardId}
          targetPostId={targetPostId}
          studentId={studentId}
        />
      </div>
    </div>
  );
}

export default ReplyButtonPage;
