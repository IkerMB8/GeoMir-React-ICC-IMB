import React, { useReducer } from 'react';
import { UserContext } from "../userContext";
import { useParams, Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "./PlaceGrid.css";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { placeMarkReducer } from "./placeMarkReducer";

const initialState = [];
const init = () => {
  return JSON.parse(localStorage.getItem("marks")) || [];
};

export default function Place() {
  const { pathname } = useLocation()
  const [marks, dispatchMarks] = useReducer(placeMarkReducer, initialState, init);
  let navigate = useNavigate();
  const { id } = useParams();
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  let [ favorito, setFavorito ] = useState(false);
  let [ marked, setMarked ] = useState(false);
  const { data, error, loading, setUrl, setOptions, refresh, setRefresh } = useFetch("https://backend.insjoaquimmir.cat/api/places/"+id, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": 'Bearer '  + authToken,
    },
    method: "GET",
  });
  useEffect(() => {
    localStorage.setItem("marks", JSON.stringify(marks));
  }, [marks]);

  useEffect(()=>{
    comprobarFavorito();
    comprobarMark();
  }, []);

  const handle = (name, description) => {
    console.log("Afegeixo marca al place amb ID "+id);
    const newMark = {
      idplace: id,
      name: name,
      description: description,
      ruta: pathname,
    };
    const action = {
      type: "Add Mark",
      payload: newMark
    };
    dispatchMarks(action);
    setMarked(true);
  };

  const handleDelete = () => {
    console.log("Eliminada la marca del place amb ruta" + pathname);
    dispatchMarks({
      type: "Del Mark",
      payload: pathname
    });
    setMarked(false);
  };

  const comprobarMark = async (e) => {
    if (marks[0] != null){
      marks.map(function(mark){
        if (mark.ruta == pathname){
          setMarked(true);
        }
      })
    }
  }

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
  const comprobarFavorito = async (e) => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id+"/favorites", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": 'Bearer '  + authToken,
        },
        method: "POST",
      })
      const resposta = await data.json();
      console.log(resposta);
      if (resposta.success == true){
        setFavorito(false);
        unfavorite();
      }else{
        setFavorito(true);
      }            
    } catch {
      console.log("Error");
    }
  };

  const favorite = async (e) => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id+"/favorites", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": 'Bearer '  + authToken,
        },
        method: "POST",
      })
      const resposta = await data.json();
      console.log(resposta);
      if (resposta.success == true){
        setFavorito(true);
      }else{
        console.log("Ya tienes en favoritos este lugar");
        setFavorito(false);
      }            
      setRefresh(!refresh);
    } catch {
      console.log("Error");
    }
  };

  const unfavorite = async (e) => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id+"/favorites", {
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
        setFavorito(false);
      }else{
        console.log("No tienes en favoritos este lugar");
      }            
      setRefresh(!refresh);
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
              <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
      : error?.message || ( 
        <div className="contenido">
          <div className="posts">
            <div className='post'>
              <div className="topp">
                  <div className="cajatopp">
                      <div className="perf">
                          <img src={"https://backend.insjoaquimmir.cat/storage/" + data.file.filepath} alt={data.name}></img><p>@{data.author.name}</p>
                      </div>
                      {usuari == data.author.email &&
                      <div className='funciones'>
                          <Link className="iconos" to={"/places/edit/"+data.id} title="Editar"><i className="bi bi-pencil-square"></i></Link> 
                          <button onClick={(e) => {deletePlace(e, data.id);}} title="Eliminar" type="submit" className="delete iconos"><i className="bi bi-trash3"></i></button>
                      </div>}
                  </div>
                  <div>
                      <h5>{ data.name }</h5>
                  </div>
              </div>
              <div>
                  <img className="imgpub" src={"https://backend.insjoaquimmir.cat/storage/" + data.file.filepath} alt={data.name}/>
              </div>
              <div className="funct">
                  <div className="functizq">
                      {favorito == false &&
                        <button onClick={(e) => {favorite(e, data.id);}} className="delete botonfav"><i className="bi bi-star"></i></button>}
                      {favorito == true &&
                        <button onClick={(e) => {unfavorite(e, data.id);}} className="delete botonfav amarillo"><i className="bi bi-star-fill"></i></button>}
                      <Link to={"/places/"+data.id+"/reviews"}><i className="bi bi-chat"></i></Link>
                      <i className="bi bi-share"></i>
                  </div>
                  <div className="functder">
                    {marked == true &&
                      <button onClick={() => handleDelete()} style={{backgroundColor:'transparent', border:'none'}}><i style={{fontSize:'2em', color:'#606468'}} className="bi bi-bookmark-check-fill"></i></button>
                    }
                    {marked == false &&  
                      <button onClick={(e) => {handle(data.name, data.description);}} style={{backgroundColor:'transparent', border:'none'}}><i style={{fontSize:'2em', color:'#606468'}} className="bi bi-bookmark"></i></button>
                    }  
                      <i className="bi bi-flag"></i>
                  </div>
              </div>
              <div>
                  <p className='nomargen'>{ data.favorites_count } favs</p>
                  <p>{ data.description }</p>
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
              <p className='centrado'>{ data.reviews_count } Reviews</p>
              <div className='latlon'>
                  <p>Latitude: { data.latitude }</p>
                  <p>Longitude: { data.longitude }</p>
              </div>
            </div> 
          </div>
        </div>
      )}
    </>
  );
}