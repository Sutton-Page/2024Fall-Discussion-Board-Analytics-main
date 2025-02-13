import React, { useState, useEffect } from "react";

// targetPostId the id of the post that the reply is being made on
// studentId the id of the student making the reply
function ReplyButtons({ boardId, targetPostId, studentId, updateCardEvent }) {
  const [showTextBox, setShowTextBox] = useState(false);
  const [replyType, setReplyType] = useState("");

  const displayNoneClass = "info-none";
  const showNoInfo = { class: "info-none", icon: "", message: "" };
  const [replyContent, setReplyContent] = useState("");
  const [infoLabelState, setInfoLabelState] = useState(showNoInfo);
  const [loadingItemClass, setLoadingItemClass] = useState(displayNoneClass);

  const loadingClass = "reply-loading";
  const successItem = {
    class: "reply-info-bar success",
    icon: "\u2713",
    message: "Reply added sucessfully!",
  };
  const errorItem = {
    class: "reply-info-bar error",
    icon: "\u26A0",
    message: "Unable to add reply!",
  };

  function closeInfoBar() {
    setInfoLabelState(showNoInfo);
  }

  const makePost = async () => {
    const requestBody = {
      boardId: boardId,
      postId: targetPostId,
      replyId: -1,
      studentId: 5,
      content: replyContent,
    };

    setLoadingItemClass(loadingClass);
    setInfoLabelState(showNoInfo);

    fetch("http://localhost:8888/reply", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        setInfoLabelState(successItem);
        setLoadingItemClass(displayNoneClass);

        updateCardEvent();
        setShowTextBox(false);
        setReplyContent("");
      })

      .catch((error) => {
        console.log(error);
        setInfoLabelState(errorItem);
        setLoadingItemClass(displayNoneClass);
      });
  };

  const handleButtonClick = (type) => {
    setReplyType(type);
    setShowTextBox(true); // Text box appears when clicked

    // checking to make sure not empty
    if (replyContent.length != 0) {
      makePost();
    } else {
      console.log("Please enter some text for the reply");
    }
  };

  return (
    <div>
      <div className={`reply-box ${showTextBox ? "open" : ""}`}>
        <h3>{replyType}</h3>
        <textarea
          placeholder={`Write your ${replyType}`}
          rows="4"
          cols="50"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        ></textarea>
      </div>

      <div className={loadingItemClass}></div>

      <div
        className="buttons"
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <button
          onClick={() => handleButtonClick("Reply")}
          style={{ width: "100%" }}
        >
          Reply
        </button>
      </div>

      <div className={infoLabelState.class}>
        <span className="info-icon">{infoLabelState.icon}</span>
        <span className="message"> {infoLabelState.message} </span>
        <button className="reply-close-button" onClick={closeInfoBar}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default ReplyButtons;
