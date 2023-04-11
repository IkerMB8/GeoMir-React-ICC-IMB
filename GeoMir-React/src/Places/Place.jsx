import React, { useReducer } from 'react';
import { UserContext } from "../userContext";
import { useParams, Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "./PlaceGrid.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addmark, delmark, compmark } from "../slices/places/placeMarkSlice";
import { db } from "../firebase";
import { doc, getDocs, deleteDoc, addDoc, collection } from "firebase/firestore";
import ReviewsList from "./Reviews/ReviewsList";
import { getPlace, delPlace, favorite, unfavorite, comprobarFavorito } from "../slices/places/thunks";

export default function Place() {
  const { pathname } = useLocation()
  let navigate = useNavigate();
  const { id } = useParams();
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  const { place, page=0, isLoading=true, error="", favorito } = useSelector((state) => state.places);

  const { marks, isMarked } = useSelector((state) => state.marks);
  const dispatch = useDispatch();

  const placeMarksCollection = collection(db, "markPlaces");
  const synchronize = async () => {
    const dades = await getDocs(placeMarksCollection);
    dades.docs.map((v) => {
      deleteDoc(doc(db, "markPlaces", v.id));
    });
    marks.map((p) => {
      addDoc(placeMarksCollection, {
        idplace: p.idplace,
        name: p.name,
        description: p.description,
        ruta: p.ruta,
      });
    });
  };

  useEffect(() => {
    synchronize();
    dispatch(compmark(pathname));
  }, [marks]);

  useEffect(()=>{
    dispatch(comprobarFavorito(id, authToken));
  }, []);

  useEffect(()=>{
    dispatch(getPlace(id, authToken));
  }, [favorito]);

  const handle = (name, description) => {
    console.log("Afegeixo marca al place amb ID "+id);
    if (description.length <= 1) return;
    const newMark = {
      idplace: id,
      name: name,
      description: description,
      ruta: pathname
    };
    console.log("Abans del dispatch");
    dispatch(addmark(newMark));
    // setMarked(true);
  };

  const deletePlace = async () => {
    dispatch(delPlace(place.id, authToken));
    navigate("/places");
  }

  return(
    <>
      {isLoading ? 
        <div className="contenidosvg">
          <svg className="load" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" xmlSpace="preserve">
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
                          <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name}></img><p>@{place.author.name}</p>
                      </div>
                      {usuari == place.author.email &&
                      <div className='funciones'>
                          <Link className="iconos" to={"/places/edit/"+place.id} title="Editar"><i className="bi bi-pencil-square"></i></Link> 
                          <button onClick={(e) => {deletePlace(place.id, authToken);}} title="Eliminar" type="submit" className="delete iconos"><i className="bi bi-trash3"></i></button>
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
                    {favorito ? (
                      <button onClick={(e) => {dispatch(unfavorite(place.id, authToken));}} className="delete botonfav amarillo"><i className="bi bi-star-fill"></i></button>
                    ) : (
                      <button onClick={(e) => {dispatch(favorite(place.id, authToken));}} className="delete botonfav"><i className="bi bi-star"></i></button>
                    )}
                    <Link to={"/places/"+place.id+"/reviews"}><i className="bi bi-chat"></i></Link>
                    <i className="bi bi-share"></i>
                  </div>
                  <div className="functder">
                    {isMarked ? (
                      // <button onClick={() => handleDelete()} style={{backgroundColor:'transparent', border:'none'}}><i style={{fontSize:'2em', color:'#606468'}} className="bi bi-bookmark-check-fill"></i></button>
                      <button onClick={() => dispatch(delmark(pathname))} style={{backgroundColor:'transparent', border:'none'}}><i style={{fontSize:'2em', color:'#606468', cursor:'pointer'}} className="bi bi-bookmark-check-fill"></i></button>
                    ) : (
                      // <button onClick={(e) => {handle(place.name, place.description);}} style={{backgroundColor:'transparent', border:'none'}}><i style={{fontSize:'2em', color:'#606468'}} className="bi bi-bookmark"></i></button>
                      <button onClick={() => handle(place.name,place.description)} style={{backgroundColor:'transparent', border:'none'}}><i style={{fontSize:'2em', color:'#606468', cursor:'pointer'}} className="bi bi-bookmark"></i></button>
                    )}
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
          <div style={{ width: '100%'}}>
            <ReviewsList id={id} reviews_count={place.reviews_count} />
          </div>
        </div>
      )}
    </>
  );
}