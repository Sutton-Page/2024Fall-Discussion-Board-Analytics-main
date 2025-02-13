import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const exists = state.posts.some(
        (post) => post.postId === action.payload.postId
      );
      if (!exists) {
        state.posts.push(action.payload);
      }
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.postId !== action.payload
      );
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
});

export const { addPost, removePost, clearPosts } = postSlice.actions;
export default postSlice.reducer;