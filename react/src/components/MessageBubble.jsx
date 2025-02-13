import React, { useState } from "react";
import UserIcon from "./UserIcon";
import "../styles/message-bubble.css";
const MessageBubble = ({ user, message }) => {
  //const { img, name, color } = user;

  var img = user["img"];
  var name = user["name"];
  var color = user["color"];

  const [isOpen, setIsOpen] = useState(false);

  const changeCss = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.bubbleContainer}>
      <UserIcon img={img} name={name} color={color} size={40} />
      <div
        onClick={changeCss}
        style={isOpen ? styles.messageTextClicked : styles.messageText}
        className="clickable-div"
      >
        {message}
      </div>
    </div>
  );
};

const styles = {
  bubbleContainer: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "15px",
  },
  messageText: {
    backgroundColor: "#f3f3f3",
    borderRadius: "10px",
    padding: "10px 15px",
    color: "#333",
    fontSize: "14px",
    flex: 1,

    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: "1.5",
    maxHeight: "calc(1.5em * 5)",
  },

  messageTextClicked: {
    backgroundColor: "#f3f3f3",
    borderRadius: "10px",
    padding: "10px 15px",
    color: "#333",
    fontSize: "14px",
    flex: 1,
  },
};

export default MessageBubble;
