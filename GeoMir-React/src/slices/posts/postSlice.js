import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    page: 0,
    isLoading: false,
    error: "",
    success: "",
    like: "",
    post: {
        body: "",
        file: { filepath: "" },
        author: { name: "" },
        latitude: 0,
        longitude: 0,
        visibility:0,
    },
}
export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        startLoadingPosts: (state) => {
            state.isLoading = true;
        },
        setPosts: (state, action ) => {
            state.posts = action.payload;
            state.isLoading = false;
        },
        setPost: (state, action ) => {
            state.post = action.payload;
            state.isLoading = false;
        },
        setError: (state,action) => { 
            state.error = action.payload;
        },
        setSuccess: (state,action) => { 
            state.success = action.payload;
        },
        setLike: (state,action) => { 
            state.like = action.payload;
        },
    }
});
    
export const { setLike, setSuccess, setError, setPosts, setPost, startLoadingPosts } = postSlice.actions;

export default postSlice.reducer