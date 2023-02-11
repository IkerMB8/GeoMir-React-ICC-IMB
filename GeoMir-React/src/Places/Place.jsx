import React from 'react';
import { UserContext } from "../userContext";
import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "./PlaceGrid.css";
import { useNavigate } from "react-router-dom";


export default function Place() {
  let navigate = useNavigate();
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
        navigate("/places");
      }            
    } catch {
      console.log("Error");
    }
  };

  useEffect(()=>{
    getPlace();
  }, [])

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
      console.log(resposta);
      if (resposta.success == true){
        navigate("/places");
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
      <div className="contenido">
        <div className="posts">
          <div className='post'>
            <div className="topp">
                <div className="cajatopp">
                    <div className="perf">
                        <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name}></img><p>@{place.author.name}</p>
                    </div>
                    {usuari == place.author.email &&
                    <div className='funciones'>
                        <Link className="iconos" to={"/places/edit/"+place.id} title="Editar"><i className="bi bi-pencil-square"></i></Link> 
                        <button onClick={(e) => {deletePlace(e, place.id);}} title="Eliminar" type="submit" className="delete iconos"><i className="bi bi-trash3"></i></button>
                    </div>}
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
                <p className='nomargen'>{ place.favorites_count } favs</p>
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
            <p className='centrado'>{ place.reviews_count } Reviews</p>
            <div className='latlon'>
                <p>Latitude: { place.latitude }</p>
                <p>Longitude: { place.longitude }</p>
            </div>
          </div> 
        </div>
      </div>
    </>
  );
}