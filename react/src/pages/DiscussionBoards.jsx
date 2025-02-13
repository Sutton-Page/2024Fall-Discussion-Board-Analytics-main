import React from "react";
import { Link } from "react-router-dom";
import "../styles/discussion-board-page.css";
import DiscussionBoardComponent from "../components/DiscussionBoardComponent";

const DiscussionBoards = () => {
  const { boards, loading } = DiscussionBoardComponent();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="discussion-board-list">
      <h2>Discussion Boards</h2>
      <ul>
        {boards.map(
          (board) => (
            console.log(board),
            (
              <li key={board.boardId} style={{ marginBottom: "10px" }}>
                <Link
                  to={`/interaction/${board.boardId}`}
                  style={{ textDecoration: "none", color: "#333" }}
                >
                  <div className="board-item">{board.name}</div>
                </Link>
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
};

export default DiscussionBoards;
