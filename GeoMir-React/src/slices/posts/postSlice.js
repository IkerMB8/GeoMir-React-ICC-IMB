import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    isLoading: false,
    error: "",
    success: "",
    like: false,
    post: {
        body: "",
        file: { filepath: "" },
        author: { name: "" },
        latitude: 0,
        longitude: 0,
        visibility:0,
    },
    page: 1,
    pages: [],
    filter: { body: "", author: ""}
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
        setPage: (state,action) => {
            state.page = action.payload
        },
        setPages: (state,action) => {
            state.pages = action.payload
        },
        setFilter: (state,action) => {
            state.filter = action.payload;
        }
    }
});
    
export const { setLike, setSuccess, setError, setPosts, setPost, startLoadingPosts, setPage, setPages, setFilter } = postSlice.actions;

export default postSlice.reducer