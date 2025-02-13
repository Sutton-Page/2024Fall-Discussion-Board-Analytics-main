import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {

    addStudent: (state, action) => {
        const exists = state.students.some(
          (student) => student.studentId === action.payload.studentId
        );
        if (!exists) {
          state.students.push(action.payload);
        }
    },
    removeStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
    clearStudents: (state) => {
      state.students = [];
    },
  },
});

export const { addStudent, removeStudent, clearStudents } = studentSlice.actions;
export default studentSlice.reducer;