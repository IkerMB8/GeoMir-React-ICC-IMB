import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    places: [],
    page: 0,
    isLoading: false,
    error: "",
    success: "",
    favorito: "",
    place: {
        name: "",
        description: "",
        file: { filepath: "" },
        author: { name: "" },
        latitude: 0,
        longitude: 0,
        visibility:0,
    },
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
    }
});
    
export const { setFavorito, setSuccess, setError, setPlaces, setPlace, startLoadingPlaces } = placeSlice.actions;

export default placeSlice.reducer