import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    marks2: JSON.parse(localStorage.getItem("marks2")) || [],
    isMarked: false
}
export const postMarkSlice = createSlice({
    name: 'marks2',
    initialState,
    reducers: {
        addpostmark: (state,action) => {
            state.marks2.push(action.payload) // aqui podem fer push
        },
        delpostmark: (state,action) => {
            state.marks2 = state.marks2.filter( mark => mark.ruta !== action.payload)
        },
        comppostmark: (state,action) => {
            state.isMarked = false;
            state.marks2.map ((mark)=> {
                if (mark.ruta === action.payload) {
                    state.isMarked = true;
                }
            })
        },
        resetPostMarks: (state, action) => {
          state.marks2 = [];
        },
    }
})
export const { addpostmark, delpostmark, comppostmark, resetPostMarks } = postMarkSlice.actions
const postMarkReducer = postMarkSlice.reducer
export default postMarkReducer