import { configureStore } from '@reduxjs/toolkit'
import placeMarkReducer from '../slices/places/placeMarkSlice'
import postMarkReducer from '../slices/posts/postMarkSlice'
import todosReducer  from '../slices/todoSlice'
import reviewReducer  from '../slices/places/reviews/reviewSlice'
import commentReducer  from '../slices/posts/comments/commentSlice'
export const store = configureStore({
    reducer: {
        todos: todosReducer,
        marks: placeMarkReducer,
        marks2: postMarkReducer,
        reviews: reviewReducer,
        comments: commentReducer    
    },
})