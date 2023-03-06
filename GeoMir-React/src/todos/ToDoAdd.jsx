import React, { useState, useContext } from 'react';
import { UserContext } from '../userContext';
import "../Places/PlacesAdd.css";
import useForm from "../hooks/useForm";

export function ToDoAdd({ handle }) {  
  let [ formulari, setFormulari ] = useState({});
  let { authtoken, setAuthToken, usuari, setUsuari }=useContext(UserContext);
  const { formState, onInputChange, onResetForm } = useForm({
    description: "",
  });  
  const { description } = formState;

  const sendTodo = (event) => {
    event.preventDefault();
    if (description.length <= 1) return;
    const newTodo = {
      id: new Date().getTime(),
      description: description,
      done: false
    };
    handle(newTodo);
  };

  return(<div className="contenido contenidoaddplace">
    <form method='POST' className="material-form">
    <h1 style={{fontSize: '1.5em',}}>ADD TODOS</h1>
      <div className="material-form__container">
        <input className="material-form__input" type="text" placeholder="" name="description" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ 0-9 .,;:-_]{4,140}" minLength="4" maxLength="140" onChange={(e) => {onInputChange(e);}}/>
        <label className="material-form__label" htmlFor="description">Descripción todo</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">Descripción no válida</p>
      </div>
      <div className='botonera'>
        <button  onClick={(e) => {sendTodo(e);}} type="submit" className="material-form__button">Crear Todo</button>
        <button className="central material-form__button" type="reset">Reiniciar</button>
      </div>
      <br></br>
    </form>
  </div>)
  }