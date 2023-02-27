import React from 'react';
import { UserContext } from "../userContext";
import { useContext, useState, useEffect } from "react";
import "./PlaceGrid.css";
import PlaceGrid from './PlaceGrid';
import useFetch from "../hooks/useFetch";

export default function PlacesGrid() {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  const { data, error, loading, setUrl, setOptions, refresh, setRefresh } = useFetch("https://backend.insjoaquimmir.cat/api/places", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": 'Bearer '  + authToken,
    },
    method: "GET",
  });

  const deletePlace = async (e, id) => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": 'Bearer '  + authToken,
        },
        method: "DELETE",
    })
      const resposta = await data.json();
      if (resposta.success == true){
        setRefresh(!refresh);
      }else{
        console.log("Error eliminando place");
        console.log(resposta.message);
      }            
    } catch {
      console.log("Error");
    }
  };
  return(
    <>
      {loading ? 
        <div className="contenidosvg">
          <svg  className="load" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="40px" height="40px" viewBox="0 0 50 50" xmlSpace="preserve">
          <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
            <animateTransform attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
      : error?.message || (
        <div className="contenido">
          <div className="posts">
              {data.map((place) => (  
                  (place.visibility.name == 'public' || usuari == place.author.email) && 
                  (<div className='post' key={place.id}><PlaceGrid place={place} deletePlace={deletePlace}/></div>) 
              ))} 
          </div>
        </div>
      )}
    </>
  );
}