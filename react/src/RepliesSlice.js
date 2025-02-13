import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  replies: [],
};

const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {
    addReply: (state, action) => {
      const exists = state.replies.some(
        (reply) => reply.replyId === action.payload.replyId
      );
      if (!exists) {
        state.replies.push(action.payload);
      }
    },
    removeReply: (state, action) => {
      state.replies = state.replies.filter(
        (reply) => reply.replyId !== action.payload
      );
    },
    clearReplies: (state) => {
      state.replies = [];
    },
  },
});

export const { addReply, removeReply, clearReplies } = replySlice.actions;
export default replySlice.reducer;