import React from 'react';
import { UserContext } from "../userContext";
import { useContext, useState, useEffect } from "react";
import "./PlaceGrid.css";
import PlaceGrid from './PlaceGrid';

export default function PlacesGrid() {
  let { authToken, setAuthToken } = useContext(UserContext);
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
        <div className="posts">
            {places.map((place) => (  
                (<div className='post' key={place.id}><PlaceGrid place={place} /></div>) 
            ))} 
        </div>
      </div>
    </>
  );
}