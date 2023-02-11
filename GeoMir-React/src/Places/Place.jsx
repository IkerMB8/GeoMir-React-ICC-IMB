import React from 'react';
import { UserContext } from "../userContext";
import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "./PlaceGrid.css";

export default function Place() {
  const { id } = useParams();
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  let [ place, setPlace ] = useState({
    author:{name:""},
    name:"",
    description:"",
    latitude:"",
    longitude:"",
    favorites_count:"",
    reviews_count:"",
    file:{filepath:""}
  });
  
  const getPlace = async () => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id, {
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
        setPlace(resposta.data);  
        console.log(place); 
      }else{
        console.log("La resposta no ha triomfat");
      }            
    } catch {
      console.log("Error");
    }
  };

  useEffect(()=>{
    getPlace();
  }, [])

  return(
    <>
      <div className="contenido">
        <div className="posts">
          <div className='post'>
            <div className="topp">
                <div className="cajatopp">
                    <div className="perf">
                        <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name}></img><p>@{place.author.name}</p>
                    </div>
                </div>
                <div>
                    <h5>{ place.name }</h5>
                </div>
            </div>
            <div>
                <img className="imgpub" src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name}/>
            </div>
            <div className="funct">
                <div className="functizq">
                    <i className="bi bi-star"></i>
                    <i className="bi bi-chat"></i>
                    <i className="bi bi-share"></i>
                </div>
                <div className="functder">
                    <i className="bi bi-flag"></i>
                </div>
            </div>
            <div>
                <p>{ place.favorites_count } favs</p>
                <p>{ place.description }</p>
            </div>
            <div className="review">
                <div>
                    <p></p>
                </div>
                <div>
                    <i className="bi fa-2x bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                </div>
            </div>
          </div> 
        </div>
      </div>
    </>
  );
}