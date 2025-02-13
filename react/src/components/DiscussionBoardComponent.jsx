import React, { useState, useEffect } from "react";
import axios from "axios";

const DiscussionBoardsComponent = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches the list of discussion boards from the server.
   * If the fetch is successful, the state is updated with the new list of boards.
   * If the fetch fails, an error is logged to the console and the state is updated with an empty array.
   * The loading state is set to false in either case.
   */
  const fetchBoards = async () => {
    try {
      const response = await axios.get("http://localhost:8888/discussions");
      setBoards(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching boards:", error);
      setBoards([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return { boards, loading };
};

export default DiscussionBoardsComponent;
