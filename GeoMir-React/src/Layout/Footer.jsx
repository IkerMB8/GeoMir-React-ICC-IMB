import  React  from 'react';
import { UserContext } from '../userContext';
import { useState, useContext } from 'react';

export default function Footer() {
  let { authToken, setAuthToken } = useContext(UserContext);

  return (
    <>
      <div className='footer'>
        <h1>Sobre nosotros</h1>
      </div>
    </>
  );
}
