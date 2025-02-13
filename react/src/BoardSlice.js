import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      const exists = state.boards.some(
        (board) => board.boardId === action.payload.boardId
      );
      if (!exists) {
        state.boards.push(action.payload);
      }
    },
    removeBoard: (state, action) => {
      state.boards = state.boards.filter(
        (board) => board.boardId !== action.payload
      );
    },
    clearBoards: (state) => {
      state.boards = [];
    },
  },
});

export const { addBoard, removeBoard, clearBoards } = boardSlice.actions;
export default boardSlice.reducer;