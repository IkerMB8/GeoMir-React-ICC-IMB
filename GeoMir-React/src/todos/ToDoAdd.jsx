// import React, { useState, useContext } from 'react';
// import { UserContext } from '../userContext';
// import "../Places/PlacesAdd.css";
// import useForm from "../hooks/useForm";

// export function ToDoAdd({ handle }) {  
//   let [ formulari, setFormulari ] = useState({});
//   let { authtoken, setAuthToken, usuari, setUsuari }=useContext(UserContext);
//   const { formState, onInputChange, onResetForm } = useForm({
//     description: "",
//   });  
//   const { description } = formState;

//   const sendTodo = (event) => {
//     event.preventDefault();
//     if (description.length <= 1) return;
//     const newTodo = {
//       id: new Date().getTime(),
//       description: description,
//       done: false
//     };
//     handle(newTodo);
//     onResetForm();
//   };

//   return(<div className="contenido contenidoaddplace">
//     <form method='POST' className="material-form">
//     <h1 style={{fontSize: '1.5em',}}>ADD TODOS</h1>
//       <div className="material-form__container">
//         <input className="material-form__input" type="text" placeholder="" name="description" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ 0-9 .,;:-_]{4,140}" minLength="4" maxLength="140" onChange={(e) => {onInputChange(e);}}/>
//         <label className="material-form__label" htmlFor="description">Descripción todo</label>
//         <div className="material-form__focus-animation"></div>
//         <p className="material-form__error">Descripción no válida</p>
//       </div>
//       <div className='botonera'>
//         <button  onClick={(e) => {sendTodo(e);}} type="submit" className="material-form__button">Crear Todo</button>
//         <button className="central material-form__button" type="reset" onClick={onResetForm}>Reiniciar</button>
//       </div>
//       <br></br>
//     </form>
//   </div>)
//   }
import "../Places/PlacesAdd.css";
import useForm from "../hooks/useForm";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtodo } from "../slices/todoSlice";

export function ToDoAdd() {   
  const { formState, onInputChange, onResetForm } = useForm({
    description: ""
  });
  const { description } = formState;
  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (description.length <= 1) return;
    const newTodo = {
      id: new Date().getTime(),
      description: description,
      done: false
    };
    onResetForm();
    //handle(newTodo)
    console.log("Abans del dispatch");
    dispatch(addtodo(newTodo));
  };

  return (
    <div className="contenido contenidoaddplace">
      <form onSubmit={(e) => {onFormSubmit(e);}} className="material-form">
        <h1 style={{fontSize: '1.5em',}}>ADD TODOS</h1>
        <div className="material-form__container">
          <input className="material-form__input" value={description} type="text" placeholder="" name="description" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ 0-9 .,;:-_]{4,140}" minLength="4" maxLength="140" onChange={(e) => {onInputChange(e);}}/>
          <label className="material-form__label" htmlFor="description">Descripción todo</label>
          <div className="material-form__focus-animation"></div>
          <p className="material-form__error">Descripción no válida</p>
        </div>
        <div className='botonera'>
          <button type="submit" className="material-form__button">Crear ToDo</button>
          <button className="central material-form__button" type="reset" onClick={onResetForm}>Reiniciar</button>
        </div>
        <br></br>
      </form>
    </div>
  );
};
