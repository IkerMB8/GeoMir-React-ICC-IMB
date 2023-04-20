/**
 * Aquest modul conté els Slice del Redux que dirigeixen les proves.
 * @module provaSlice
 * @requires reduxjs/toolkit
 */
import { createSlice } from '@reduxjs/toolkit'

/**
* L'estat inicial de la funcionalitat de plantilla.
* @typedef {Object} TemplateState
* @property {number} value - El valor actual de la plantilla.
*/
export const templateSlice = createSlice({
 name: 'template',
 initialState: { 
 value: 0, 
 }, 
 reducers: {
/**
* Una funció reductora de Redux que incrementa el valor de la plantilla en 1.
* @function
* @param {TemplateState} state - L'estat actual de la funcionalitat de plantilla.
*/
 increment: (state) => {
 state.value += 1
},
 },
})

// Action creators are generated for each case reducer function

/**
* Accions generades per a cada funció reductora de Redux en templateSlice.
* @namespace
*/
export const { increment } = templateSlice.actions

export const templateReducer = templateSlice.reducer