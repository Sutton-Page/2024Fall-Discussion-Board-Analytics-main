import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./StudentSlice";
import postReducer from "./PostSlice";
import replyReducer from "./RepliesSlice";
import boardReducer from "./BoardSlice";


const store = configureStore({
    reducer: {
        student: studentReducer,
        post: postReducer,
        reply: replyReducer,
        board: boardReducer
    },
});

export default store;