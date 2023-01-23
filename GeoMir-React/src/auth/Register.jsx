import { useState } from "react";
export default function Register({ setCanvi }) {
  
  let [formulario, setFormulari] = useState({});

  const handleChange = (e) => {
    e.preventDefault();

    setFormulari({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();

    let { user, correu, password, password2 } = formulario;
    alert(
      "He enviat les Dades:  " +
        user +
        "/" +
        correu +
        "/" +
        password +
        "/" +
        password2
    );
  };


  return (
    <>
      <h1>Regístrate</h1>
      <div class="colocar">
        <form name="formulario" class="formulario">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username" >Usuari</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="user" id="username" type="text" placeholder="Username" onChange={handleChange}/>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="correu" id="email" type="mail" placeholder="Email" onChange={handleChange}/>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" id="password" type="password" placeholder="******************" onChange={handleChange}/>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm-password">Confirm Password</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password2" id="confirm-password" type="password" placeholder="******************" onChange={handleChange}/>
          </div>
          <div class="flex items-center justify-between">
            <button class="btn" type="submit" 
              onClick={(e) => {
                handleRegister(e);
              }}>
              Register
            </button>
          </div>
        </form>
        <button
          onClick={() => {
            setCanvi(true);
          }} class="cambio"
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </button>
      </div>
      
    </>
  );
}