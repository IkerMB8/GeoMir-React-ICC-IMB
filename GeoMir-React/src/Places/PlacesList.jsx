import React from 'react';
import { UserContext } from "../userContext";
import { useContext, useState, useEffect } from "react";
import "./PlaceList.css";
import PlaceList from './PlaceList';

export default function PlacesList() {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  let [ places, setPlaces ] = useState([]);
  
  const getPlaces = async (e) => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": 'Bearer '  + authToken,
        },
        method: "GET",
    })
      const resposta = await data.json();
      console.log(resposta);
      if (resposta.success == true){
        setPlaces(resposta.data);  
        console.log(places); 
      }else{
        console.log("La resposta no ha triomfat");
      }            
    } catch {
      console.log("Error");
    }
  };

  useEffect(()=>{
    getPlaces();
  }, [])

  return(
    <>
      <div className="contenido">
        <h1>Places</h1>
        <div className="contenedor">
          <table className="tabla">
              <thead>
                  <tr>
                      <th><h1>ID</h1></th>
                      <th><h1>Nom</h1></th>
                      <th><h1>Descripció</h1></th>
                      <th><h1>Fitxer</h1></th>
                      <th><h1>Latitud</h1></th>
                      <th><h1>Longitud</h1></th>
                      <th><h1>Visibilitat</h1></th>
                      <th><h1>Autor</h1></th>
                      <th><h1>Favorits</h1></th>
                      <div>
                      {isLoggedIn ? (
                        <LogoutButton onClick={this.handleLogoutClick} />
                      ) : (
                        <LoginButton onClick={this.handleLoginClick} />
                      )}
                    </div>
                      <th colSpan="3"><h1>Accions</h1></th>
                  </tr>
              </thead>
              <tbody>
                  {places.map((place) => (  
                      (<tr key={place.id}><PlaceList place={place} /></tr>) 
                  ))} 
              </tbody>
          </table>
        </div>
      </div>
    </>
  );
}