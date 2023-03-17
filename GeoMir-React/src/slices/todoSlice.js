import { createSlice } from '@reduxjs/toolkit';
import { db } from "../firebase";
import {doc, getDocs, deleteDoc, addDoc, collection, updateDoc } from "firebase/firestore";

const initialState = {
    // todos: JSON.parse(localStorage.getItem("todos")) || []
    todos: []
}
const todosCollection = collection(db,"ToDos");
export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addtodostate: (state,action) => {
            state.todos.push(action.payload) // aqui podem fer push
        },
        addtodo: (state,action) => {
            state.todos.push(action.payload) // aqui podem fer push
            addDoc(todosCollection, {
              id: action.payload.id,
              description: action.payload.description,
              user: action.payload.user,
              done: action.payload.done,
            });
        },
        deltodo: (state,action) => {
            state.todos = state.todos.filter( todo => todo.id !== action.payload)
            const deleteTodo = async (id) => {
              const dades = await getDocs(todosCollection);
              dades.docs.map((v) => {
                if (v.data().id == id){
                  deleteDoc(doc(db, "ToDos", v.id));
                }
              });
            }
            deleteTodo(action.payload);
        },
        toggletodo: (state,action) => {
            state.todos = state.todos.map ((todo)=> {
                if (todo.id === action.payload) { //id
                    const updateTodo = async (id) => {
                      const dades = await getDocs(todosCollection);
                      dades.docs.map((v) => {
                        if (v.data().id == id){
                          updateDoc(doc(db, "ToDos", v.id), {done: !v.data().done});
                        }
                      });
                    }
                    updateTodo(action.payload);
                    return { ...todo, done:!todo.done } // invertim el done
                }
                return todo
            })
        },
        resetState: (state, action) => {
          state.todos = [];
        },
    }
})
export const { addtodostate, addtodo, deltodo, toggletodo, resetState } = todosSlice.actions
const todosReducer = todosSlice.reducer
export default todosReducer