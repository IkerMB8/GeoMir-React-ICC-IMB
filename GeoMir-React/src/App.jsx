import React, { useState } from 'react';
import Login from './auth/Login';
import Register from '.auth/Register';
import "./style.css";

export default function App() {
  let [login, setLogin] = useState(true);

  return (
    <div className='App'>
      {login ? <Login setCanvi={setLogin} /> : <Register setCanvi={setLogin} />}
    </div>
  );
}