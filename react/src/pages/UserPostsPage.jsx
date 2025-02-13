import React, { useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import ChatPage from "./ChatPage";

const UserPostsPage = ({ boardId, studentId, onPostClick }) => {
  const handlePostClick = (postId) => {
    if (onPostClick) {
      onPostClick(postId, boardId, studentId);
    }
  };

  console.log("boardId:", boardId);
  console.log("studentId:", studentId);

  return (
    <div style={styles.postsContainer}>
      <Card
        boardId={parseInt(boardId, 10)}
        studentId={parseInt(studentId, 10)}
        isUserPosts={true}
        onPostClick={handlePostClick}
      />
    </div>
  );
};
const styles = {
  pageTitle: {
    marginBottom: "20px",
    color: "#343a40",
    fontSize: "24px",
  },
  postsContainer: {
    width: "100%",
    maxWidth: "800px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    position: "relative",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "800px",
    maxHeight: "90vh",
    overflow: "auto",
  },
  closeButton: {
    position: "absolute",
    right: "10px",
    top: "10px",
    border: "none",
    background: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#343a40",
  },
};

export default UserPostsPage;
