import React, { useState, useEffect } from "react";
import GraphComponent from "../components/GraphComponent";
import axios from "axios";
import defaultIcon from "/default_picture.png";
import { useParams } from "react-router-dom";
import ChatPage from "../pages/ChatPage.jsx";
import UserPostsPage from "../pages/UserPostsPage.jsx";

const StudentInteractionGraph = () => {
  const { boardId } = useParams();
  const [students, setStudents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [showUserPosts, setShowUserPosts] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get("http://localhost:8888/student");
      const data = response.data;
      setStudents(data);
    };

    const fetchPosts = async () => {
      const response = await axios.get(
        `http://localhost:8888/posts/${boardId}`
      );
      const data = response.data;
      console.log(data);
      setPosts(data);
    };

    const fetchReplies = async () => {
      const response = await axios.get(
        `http://localhost:8888/replies/${boardId}`
      );
      const data = response.data;
      console.log(data);
      setReplies(data);
    };

    const fetchDiscussions = async () => {
      const response = await axios.get("http://localhost:8888/discussions");
      const data = response.data;
      setDiscussions(data);
    };

    fetchStudents();
    fetchPosts();
    fetchReplies();
    fetchDiscussions();
  }, [boardId, refreshTrigger]);

  const postMap = posts.reduce((acc, post) => {
    acc[post.postId] = post.studentId;
    return acc;
  }, {});

  const nodes = students.map((student) => ({
    id: student.studentId,
    name: student.name,
    img: student.icon && student.icon !== "" ? student.icon : defaultIcon,
    color: student.color,
  }));

  const handleNodeClick = (studentId) => {
    setSelectedStudentId(studentId);
    setShowUserPosts(true);
  };

  const handlePostClick = (postId, boardId, studentId) => {
    setSelectedPostId(postId);
    setSelectedBoardId(boardId);
    setSelectedStudentId(studentId);
    setShowUserPosts(false);
    setShowChat(true);
  };

  const refreshGraph = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const links = replies.reduce((acc, reply) => {
    const fromStudentId = reply.studentId;
    const toStudentId = postMap[reply.postId];

    if (fromStudentId !== undefined && toStudentId !== undefined) {
      const existingLink = acc.find(
        (link) =>
          (link.source === fromStudentId && link.target === toStudentId) ||
          (link.source === toStudentId && link.target === fromStudentId)
      );

      if (existingLink) {
        existingLink.interactions += 1;
        if (existingLink.source === fromStudentId) {
          existingLink.sourceCount += 1;
        } else {
          existingLink.targetCount += 1;
        }
      } else {
        acc.push({
          source: fromStudentId,
          target: toStudentId,
          interactions: 1,
          sourceCount: 1,
          targetCount: 0,
        });
      }
    }

    return acc;
  }, []);

  return (
    <div>
      <GraphComponent
        nodes={nodes}
        links={links}
        boardId={boardId}
        onNodeClick={handleNodeClick}
      />

      {showUserPosts && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowUserPosts(false)}
        >
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <UserPostsPage
              boardId={parseInt(boardId, 10)}
              studentId={selectedStudentId}
              onPostClick={handlePostClick}
            />
          </div>
        </div>
      )}

      {showChat && (
        <div style={styles.modalOverlay} onClick={() => setShowChat(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <ChatPage
              boardId={selectedBoardId || parseInt(boardId, 10)}
              targetPostId={selectedPostId}
              studentId={selectedStudentId}
              isUserPosts={showUserPosts}
              onReplySubmitted={refreshGraph}
            />
          </div>
        </div>
      )}
    </div>
  );
};
const styles = {
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
    maxWidth: "500px",
    maxHeight: "90vh",
    overflow: "auto",
  },
};

export default StudentInteractionGraph;
