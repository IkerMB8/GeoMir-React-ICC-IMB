import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // marks: JSON.parse(localStorage.getItem("marks")) || [],
    marks: [],
    isMarked: false
}
export const placeMarkSlice = createSlice({
    name: 'marks',
    initialState,
    reducers: {
        addmark: (state,action) => {
            state.marks.push(action.payload) // aqui podem fer push
        },
        delmark: (state,action) => {
            state.marks = state.marks.filter( mark => mark.ruta !== action.payload)
        },
        compmark: (state,action) => {
            state.isMarked = false;
            state.marks.map ((mark)=> {
                if (mark.ruta === action.payload) {
                    state.isMarked = true;
                }
            })
        },
        resetPlaceMarks: (state, action) => {
          state.marks = [];
        },
    }
})
export const { addmark, delmark, compmark, resetPlaceMarks } = placeMarkSlice.actions
const placeMarkReducer = placeMarkSlice.reducer
export default placeMarkReducer