import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    marks2: JSON.parse(localStorage.getItem("marks2")) || [],
    isMarked: false
}
export const postMarkSlice = createSlice({
    name: 'marks2',
    initialState,
    reducers: {
        addmark: (state,action) => {
            state.marks2.push(action.payload) // aqui podem fer push
        },
        delmark: (state,action) => {
            state.marks2 = state.marks2.filter( mark => mark.ruta !== action.payload)
        },
        compmark: (state,action) => {
            state.isMarked = false;
            state.marks2.map ((mark)=> {
                if (mark.ruta === action.payload) {
                    state.isMarked = true;
                }
            })
        }
    }
})
export const { addmark, delmark, compmark } = postMarkSlice.actions
const postMarkReducer = postMarkSlice.reducer
export default postMarkReducer