import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DiscussionBoardDetail = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8888/discussion/${id}`
        );
        setBoard(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching board:", error);
        setBoard(null);
        setLoading(false);
      }
    };

    fetchBoard();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!board) {
    return <h2>Discussion Board not found</h2>;
  }

  return (
    <div className="discussion-board-detail">
      <h2>{board.name}</h2>
      <div className="board-info">
        <p>Board ID: {board.boardId}</p>
      </div>
    </div>
  );
};

export default DiscussionBoardDetail;
