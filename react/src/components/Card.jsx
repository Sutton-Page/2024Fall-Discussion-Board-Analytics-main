/**
 * The `Card` component represents a card-like UI element that displays a main message, user information, and any replies or user posts.
 *
 * @param {object} props - The component props.
 * @param {string} props.boardId - The ID of the board.
 * @param {string} props.targetPostId - The ID of the target post.
 * @param {string} props.studentId - The ID of the student.
 * @param {string} props.postId - The ID of the post.
 * @param {boolean} [props.isUserPosts=false] - Indicates whether the card should display user posts instead of a main message and replies.
 * @param {function} props.onPostClick - A callback function that is called when a user post is clicked.
 */
import React, { useEffect, useState } from "react";
import "../styles/Card.css";
import MessageBubble from "./MessageBubble";
import UserIcon from "./UserIcon";
import axios from "axios";
import ReplyButtons from "./ReplyButtons";
import PostBubble from "./PostBubble";

const Card = ({
  boardId,
  targetPostId,
  studentId,
  postId,
  isUserPosts = false,
  onPostClick,
}) => {
  const [mainUser, setMainUser] = useState({});
  const [mainMessage, setMainMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const defaultIcon = "/default_picture.png";

  /**
   * Fetches the main user data for the given student ID and updates the `mainUser` state with the user information.
   *
   * @param {string} studentId - The ID of the student to fetch the main user data for.
   */
  const fetchMainUser = async (studentId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/student/${studentId}`
      );
      console.log("[Card] Main user data:", data.data);
      setMainUser(data.data);
    } catch (error) {
      console.error("[Card] Failed to fetch main user data:", error);
    }
  };

  /**
   * Fetches the main post data for the given post ID and updates the `mainMessage` state with the post content.
   *
   * @param {string} postId - The ID of the post to fetch.
   */
  const fetchMainPost = async (postId) => {
    try {
      const { data } = await axios.get(`http://localhost:8888/post/${postId}`);
      console.log("[Card] Main post data:", data.data);
      setMainMessage(data.data.content);
    } catch (error) {
      console.error("[Card] Failed to fetch main post data:", error);
    }
  };

  const updateCard = async () => {
    fetchReplies(postId);
  };

  /**
   * Fetches the replies for the given post ID and updates the `responses` state with the reply data.
   *
   * @param {string} postId - The ID of the post to fetch the replies for.
   */
  const fetchReplies = async (postId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/v2/post/${postId}/replies`
      );
      console.log("[Card] Replies data:", data.data);
      const replies = data.data.map((reply) => ({
        user: {
          name: reply.name,
          img: reply.icon || defaultIcon,
          color: reply.color,
        },
        message: reply.content,
      }));
      setResponses(replies);
    } catch (error) {
      console.error("[Card] Failed to fetch replies:", error);
    }
  };

  /**
   * Fetches the user posts for the given student ID and board ID, and updates the `userPosts` state with the post data.
   *
   * @param {string} studentId - The ID of the student to fetch the posts for.
   * @param {string} boardId - The ID of the board to fetch the posts for.
   */
  const fetchUserPosts = async (studentId, boardId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/board/${boardId}/student/${studentId}/posts`
      );
      console.log("[Card] User posts data:", data.data);
      const posts = data.data.map((post) => ({
        id: post.postId,
        user: {
          name: mainUser.name || "Anonymous",
          img: mainUser.icon || defaultIcon,
          color: mainUser.color || "#000000",
        },
        message: post.content,
      }));
      setUserPosts(posts);
    } catch (error) {
      console.error("[Card] Failed to fetch user posts:", error);
    }
  };

  /**
   * Handles the side effects of the `Card` component, fetching user posts, main post, and replies based on the component's props.
   *
   * This `useEffect` hook is responsible for fetching data from the server and updating the component's state accordingly. It checks the `isUserPosts` prop to determine whether to fetch user posts or the main post and replies.
   *
   * @param {string} postId - The ID of the post to fetch the replies for.
   * @param {string} boardId - The ID of the board to fetch the posts for.
   * @param {string} targetPostId - The ID of the target post to fetch the main post and replies for.
   * @param {boolean} isUserPosts - A flag indicating whether to fetch user posts or the main post and replies.
   */
  useEffect(() => {
    console.log("[Card] Props:", {
      boardId,
      targetPostId,
      studentId,
      postId,
      isUserPosts,
    });

    if (isUserPosts) {
      fetchMainUser(studentId);
      console.log(
        "[Card] Fetching user posts for student:",
        studentId,
        "board:",
        boardId
      );
      fetchUserPosts(studentId, boardId);
    } else {
      fetchMainUser(studentId);
      fetchMainPost(targetPostId);
      fetchReplies(targetPostId);
    }
  }, [postId, boardId, targetPostId, isUserPosts]);

  /**
   * Renders the `Card` component, which displays either user posts or a main post with replies based on the `isUserPosts` prop.
   *
   * If `isUserPosts` is true, the component displays the user's posts with their profile information. If `isUserPosts` is false, the component displays the main post with the user's profile information and any replies to the post.
   *
   * @param {boolean} isUserPosts - A flag indicating whether to display user posts or the main post and replies.
   * @param {string} boardId - The ID of the board to fetch the posts for.
   * @param {string} targetPostId - The ID of the target post to fetch the main post and replies for.
   * @param {string} studentId - The ID of the student to fetch the posts for.
   * @param {function} onPostClick - A callback function to handle clicks on user posts.
   * @param {string} mainMessage - The message of the main post.
   * @param {Array<{ user: { name: string, img: string, color: string }, message: string }>} responses - An array of replies to the main post.
   */
  return (
    <div className="card">
      {isUserPosts && (
        <>
          <div className="centered-icon">
            <UserIcon
              img={mainUser.icon || defaultIcon}
              name={mainUser.name}
              color={mainUser.color}
              size={70}
            />
          </div>
          <div className="user-posts">
            {userPosts.map((post, index) => (
              <div
                key={index}
                onClick={() => onPostClick(post.id)}
                style={{ cursor: "pointer" }}
              >
                <PostBubble message={post.message} />
              </div>
            ))}
          </div>
        </>
      )}
      {!isUserPosts && (
        <>
          <div className="centered-icon">
            <UserIcon
              img={mainUser.icon || defaultIcon}
              name={mainUser.name}
              color={mainUser.color}
              size={70}
            />
          </div>
          <div className="main-message">{mainMessage}</div>
          <div className="message-bubble-height-limit">
            {responses.map((response, index) => (
              <MessageBubble
                key={index}
                user={response.user}
                message={response.message}
              />
            ))}
          </div>
          <ReplyButtons
            boardId={boardId}
            targetPostId={targetPostId}
            studentId={studentId}
            updateCardEvent={() => fetchReplies(targetPostId)}
          />
        </>
      )}
    </div>
  );
};
export default Card;
