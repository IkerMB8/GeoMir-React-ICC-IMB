import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reviews: [],
    page: 1,
    isLoading: false,
    add: true,
    error: "",
    reviewsCount : 0,
    pages: [],
}
export const reviewSlice = createSlice({

    name: "review",
    initialState,
    reducers: {
        startLoadingReviews: (state) => {
            state.isLoading = true;
        },
        setReviews: (state, action ) => {
          state.reviews= action.payload
          state.isLoading=false
        },
        setAdd: (state,action) =>  {
            state.add = action.payload
        },
        setError: (state,action) => { 
            state.error = action.payload
        },
        setReviewsCount: (state,action) => {
            state.reviewsCount = action.payload
        },
        setPage: (state,action) => {
            state.page = action.payload
        },
        setPages: (state,action) => {
            state.pages = action.payload
        },
    }
});
    
export const { startLoadingReviews,setReviews,setAdd,setError,setReviewsCount, setPage, setPages } = reviewSlice.actions;

export default reviewSlice.reducer