import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    places: [],
    isLoading: false,
    error: "",
    success: "",
    favorito: false,
    place: {
        name: "",
        description: "",
        file: { filepath: "" },
        author: { name: "" },
        latitude: 0,
        longitude: 0,
        visibility:0,
    },
    page: 1,
    pages: [],
    filter: { description: "", author: ""}
}
export const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {
        startLoadingPlaces: (state) => {
            state.isLoading = true;
        },
        setPlaces: (state, action ) => {
            state.places = action.payload;
            state.isLoading = false;
        },
        setPlace: (state, action ) => {
            state.place = action.payload;
            state.isLoading = false;
        },
        setError: (state,action) => { 
            state.error = action.payload;
        },
        setSuccess: (state,action) => { 
            state.success = action.payload;
        },
        setFavorito: (state,action) => { 
            state.favorito = action.payload;
        },
        setPage: (state,action) => {
            state.page = action.payload;
        },
        setPages: (state,action) => {
            state.pages = action.payload;
        },
        setFilter: (state,action) => {
            state.filter = action.payload;
        }
    }
});

export const { setFavorito, setSuccess, setError, setPlaces, setPlace, startLoadingPlaces, setPage, setPages, setFilter } = placeSlice.actions;

export default placeSlice.reducer