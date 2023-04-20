//@ts-check

/**
 * Aquest modul conté els Slice del Redux que dirigeixen els marked posts.
 * @module placeMarkSlice
 * @requires reduxjs/toolkit
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // marks: JSON.parse(localStorage.getItem("marks")) || [],
    marks: [],
    isMarked: false
}

/**
* A Redux slice that handles place marks, including adding, deleting, comparing, and resetting them.
* @typedef {Object} PlaceMarkSlice
* @property {string} name - El nom del slice.
* @property {Object} initialState - L'initial state del slice.
* @property {Function} reducers - L'objecte que conté funcions per modificar el state.
*/
export const placeMarkSlice = createSlice({
    name: 'marks',
    initialState,
    reducers: {
        /**
        * Afegeix un place mark al state.
        * @function
        * @param {Object} state - L'actual state del slice.
        * @param {Object} action - L'accio de l'objecte Redux que conté la nova place mark.
        */
        addmark: (state,action) => {
            state.marks.push(action.payload) // aqui podem fer push
        },
        /**
        * Esborra un place mark del state.
        * @function
        * @param {Object} state - L'actual state del slice.
        * @param {Object} action - L'accio de l'objecte Redux que conté l'ID del place mark per esborrar.
        */
        delmark: (state,action) => {
            state.marks = state.marks.filter( mark => mark.ruta !== action.payload)
        },

        /**
        * Compara el place mark per determinar si existeix en el state.
        * @function
        * @param {Object} state - L'actual state del slice.
        * @param {Object} action - L'accio de l'objecte Redux que conté l'ID del place mark per comparar.
        */
        compmark: (state,action) => {
            state.isMarked = false;
            state.marks.map ((mark)=> {
                if (mark.ruta === action.payload) {
                    state.isMarked = true;
                }
            })
        },
        /**
        * Reseteja tots els place marks a una llista buida.
        * @function
        * @param {Object} state - L'actual state del slice.
        * @param {Object} action - L'accio de l'objecte Redux.
        */
        resetPlaceMarks: (state, action) => {
          state.marks = [];
        },
    }
})

/**
* Els creadors de les accions Redux pel place mark slice.
* @type {Object}
* @property {Function} addmark - Creador de l'accio per afegir a place mark.
* @property {Function} delmark - Creador de l'accio per esborrar a place mark.
* @property {Function} compmark - Creador de l'accio per comparar a place mark.
* @property {Function} resetPlaceMarks - Creador de l'accio per resetejar les place mark.
*/
export const { addmark, delmark, compmark, resetPlaceMarks } = placeMarkSlice.actions
const placeMarkReducer = placeMarkSlice.reducer

/**

El place mark reducer, el qual combina les accions definides al slice amb l'actual estat per produïr un nou estat.
@type {Function}
*/
export default placeMarkReducer