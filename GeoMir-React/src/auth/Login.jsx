import React from "react";
import { UserContext } from "../userContext";
import { useState , useContext } from "react";
// import useForm from "../hooks/useForm";
import useLogin from "../hooks/useLogin";
import { useForm } from "react-hook-form";

export default function Login({ setCanvi }) {
  let {authToken, setAuthToken, usuari, setUsuari} = useContext(UserContext);
  // const { formState, onInputChange, onResetForm } = useForm({
  //   email: "",
  //   password: "",
  // });  
  // const { email, password } = formState;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { doLogin, error, setError } = useLogin();  
  const onSubmit = data => doLogin(data);

  return (
    <>
      <div>
        <h1>Login</h1>
        <div className="grid">
          <form onSubmit={handleSubmit(onSubmit)} className="form login">
            <div className="form__field">
              <label htmlFor="login__username"><svg className="icon">
                  <use xlinkHref="#icon-user"></use>
                </svg><span className="hidden">Username</span></label>
                {/* <input id="username" type="text" name="email" className="form__input" placeholder="Email" onChange={(e) => {onInputChange(e); }} /> */}
                <input {...register("email", {
                    required: "Aquest camp és obligatori",
                    minLength: {
                      value: 6,
                      message: "El email ha de tenir al menys 6 caràcters"
                    },
                    maxLength: {
                      value: 40,
                      message: "El email ha de tenir com a màxim 40 caràcters"
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@fp\.insjoaquimmir\.cat$/,
                      message: "El email tiene que ser del dominio @fp.insjoaquimmir.cat" 
                    }})} id="username" type="text" className="form__input" placeholder="Email"/>                
            </div>
            {errors.email ? <div className="error">{errors.email.message}</div> : <></>}
            <div className="form__field">
              <label htmlFor="login__password"><svg className="icon">
                  <use xlinkHref="#icon-lock"></use>
                </svg><span className="hidden">Password</span></label>
                {/* <input id="password" type="password" name="password" className="form__input" placeholder="Password" onChange={(e) => {onInputChange(e);}} /> */}
                <input {...register("password", {
                    required: "Aquest camp és obligatori",
                    minLength: {
                      value: 8,
                      message: "La contrasenya ha de tenir al menys 8 caràcters"
                    },
                    maxLength: {
                      value: 20,
                      message: "La contrasenya ha de tenir com a màxim 20 caràcters"
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                      message: "La contrasenya ha de contenir al menys una minúscula, una majúscula, i un número" 
                    }})} id="password" type="password" className="form__input" placeholder="Password"/>
            </div>
            {errors.password ? <div className="error">{errors.password.message}</div> : <></>}
            {error ? <div className="error">{error}</div> : <></>}
            <div className="form__field">
                {/* <input onClick={(e) => {doLogin(e, email, password);}} className="submit" type="submit" value="Iniciar Sesión"></input> */}
                <input className="submit" type="submit" value="Iniciar Sesión"></input>
            </div>
          </form>
          <p className="text--center">¿No tienes cuenta? <a href="#" onClick={() => {setCanvi(false);}} > Regístrate</a>
            <svg className="icon">
              <use xlinkHref="#icon-arrow-right"></use>
            </svg>
          </p>
        </div>
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


