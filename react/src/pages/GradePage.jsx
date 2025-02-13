import React, { useEffect, useRef, useState } from "react";

import DisplayGrades from "../components/Grades";
import "../styles/grade-item.css";
import "../styles/grade-page.css";
import axios from "axios";




function GradePage() {

  var boardId= 1 ;

  const [currentBoard, setCurrentBoard] = useState(0);
  const [boardData,setBoardData] = useState([]);

  const retrieveBoards = async () => {

      axios.get("http://localhost:8888/discussions").then((response) => {

          const data = response.data;
          console.log(data);
          setBoardData(data);
          setCurrentBoard(data[0]['boardId']);
      })
  }

  useEffect(() => {

      retrieveBoards()
  }, [])
  
  

  return (

    <div className="grades-page">
    <header className="top-content">
      <h1>Student Grades</h1>
      <div className="board-selector">
      <label htmlFor="board">Select Discussion Board:</label>
      <select
        id="board"
        name="board"
        value={currentBoard}
        onChange={(e) => setCurrentBoard(e.target.value)}
      >
        <option value="" disabled>
          -- Select a Board --
        </option>
        {boardData.map((board) => {
          return (
            <option key={board.boardId} value={board.boardId}>
              {board.name}
            </option>
          );
        })}
        </select>
        
        
      </div>
    </header>

    <div>
      <DisplayGrades boardId={currentBoard}></DisplayGrades>
    </div>
    
  </div>
    
  );
}

export default GradePage;
