import { useState } from "react";
import React from "react";
export default function Login({ setCanvi }) {
  let [correu, setCorreu] = useState("");
  let [password, setPassword] = useState("");
  let [cpassword, setCPassword] = useState("");

  const sendLogin = (e) => {
    e.preventDefault();

    alert("He enviat les Dades:  " + correu + "/" + password + "/" + cpassword);
  };

  return (
    <>
      <h1>Log In</h1>
      <div class="colocar">
        <form class="formulario">
          <div class="mb-4">
            <input id="username" type="text" name="correu" placeholder="Email"
              onChange={(e) => {
                setCorreu(e.target.value);
              }}
            />
          </div>
          <div class="mb-4">
            <input id="password" type="password" name="password" placeholder="Password" 
              onChange={(e) => {
                setPassword(e.target.value);
              }} 
            />
          </div>
          <div class="mb-4">
            <input id="confirm-password" type="password" name="cpassword" placeholder="Confirm Password"
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
            />
          </div>
          <div class="flex items-center justify-between">
            <button class="btn" type="submit"
              onClick={(e) => {
                sendLogin(e);
              }}
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <button
            onClick={() => {
              setCanvi(false);
            }} class="cambio"
          >
        ¿No tienes cuenta? Regístrate
        </button>
      </div>
      
    </>
  );
}


