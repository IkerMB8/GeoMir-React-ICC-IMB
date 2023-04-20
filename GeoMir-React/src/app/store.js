import { configureStore } from '@reduxjs/toolkit'
import placeMarkReducer from '../slices/places/placeMarkSlice'
import postMarkReducer from '../slices/posts/postMarkSlice'
import todosReducer  from '../slices/todoSlice'
import reviewReducer  from '../slices/places/reviews/reviewSlice'
import commentReducer  from '../slices/posts/comments/commentSlice'
import placeReducer  from '../slices/places/placeSlice'
import postReducer  from '../slices/posts/postSlice'
export const store = configureStore({
    reducer: {
        todos: todosReducer,
        marks: placeMarkReducer,
        marks2: postMarkReducer,
        reviews: reviewReducer,
        comments: commentReducer,
        places: placeReducer,    
        posts: postReducer,
    },
})