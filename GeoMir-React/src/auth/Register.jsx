import React from 'react'
import { UserContext } from '../userContext';
import { useState, useContext } from 'react';
import useForm from "../hooks/useForm";

export default function Register({ setCanvi }) {
  let [error, setError] = useState("");
  let {authToken, setAuthToken, usuari, setUsuari}=useContext(UserContext);
  const { formState, onInputChange, onResetForm } = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });  
  const {name,email,password,password2} = formState;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password == password2){
      alert("He enviat les Dades:  " + name +"/" +email +"/" + password + "/" +password2);
      // Enviam dades a l'aPI i recollim resultat
      try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/register", {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          // Si els noms i les variables coincideix, podem simplificar
          body: JSON.stringify({ name, email, password })
        })
  
        const resposta = await data.json();
        if (resposta.success === true){
          // alert(resposta.authToken);
          setAuthToken(resposta.authToken);
          setUsuari(email);
          if (! sessionStorage.getItem('token')){
            sessionStorage.setItem('token', resposta.authToken);
          }
        }else{
          setError(resposta.message);
        } 
        // alert("He enviat les Dades:  " + email + "/" + password);
      } catch {
        console.log("Error");
        //alert("catch");
      }
    }else{
      setError("Las contraseñas no coinciden")
    }
  };

  return (
    <>
      <h1>Regístrate</h1>
      
      <div className="grid">

        <form method="POST" className="form login">

          <div className="form__field">
            <label htmlFor="login__username"><svg className="icon">
                <use xlinkHref="#icon-user"></use>
              </svg><span className="hidden">Username</span></label>
              <input className="form__input" name="name" id="username" type="text" placeholder="Username" onChange={(e) => {onInputChange(e); }}/>              
          </div>

          <div className="form__field">
            <label htmlFor="login__username"><svg className="icon">
                <use xlinkHref="#icon-user"></use>
              </svg><span className="hidden">Username</span></label>
              <input className="form__input" name="email" id="email" type="mail" placeholder="Email" onChange={(e) => {onInputChange(e); }}/>      
          </div>

          <div className="form__field">
            <label htmlFor="login__password"><svg className="icon">
                <use xlinkHref="#icon-lock"></use>
              </svg><span className="hidden">Password</span></label>
              <input className="form__input" name="password" id="password" type="password" placeholder="******************" onChange={(e) => {onInputChange(e); }}/>  
          </div>

          <div className="form__field">
            <label htmlFor="login__password"><svg className="icon">
                <use xlinkHref="#icon-lock"></use>
              </svg><span className="hidden">Password</span></label>
              <input className="form__input" name="password2" id="confirm-password" type="password" placeholder="******************" onChange={(e) => {onInputChange(e); }}/>  
          </div>

          {error ? <div className="error">{error}</div> : <></>}
          <div className="form__field">
              <input onClick={(e) => {handleRegister(e);}} className="submit" type="submit" value="Regístrate"></input>
          </div>

        </form>
        <p className="text--center">¿Ya tienes cuenta? <a href="#" onClick={() => {setCanvi(true);}} > Inicia Sesión</a>
          <svg className="icon">
            <use xlinkHref="#icon-arrow-right"></use>
          </svg>
        </p>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" className="icons">
        <symbol id="icon-arrow-right" viewBox="0 0 1792 1792">
          <path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" />
        </symbol>
        <symbol id="icon-lock" viewBox="0 0 1792 1792">
          <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
        </symbol>
        <symbol id="icon-user" viewBox="0 0 1792 1792">
          <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
        </symbol>
      </svg>
    </>
  );
}