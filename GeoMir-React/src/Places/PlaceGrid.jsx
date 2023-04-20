import React from 'react';
import "./PlaceGrid.css";
import { Link } from 'react-router-dom';
import { UserContext } from "../userContext";
import { useContext } from "react";
import { delPlace } from "../slices/places/thunks";
import { useDispatch } from "react-redux";

export const PlaceGrid = ({place}) => {    
    let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
    const dispatch = useDispatch();

    return(
        <>
            <div className="topp">
                <div className="cajatopp">
                    <div className="perf">
                        <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name}></img><p>@{place.author.name}</p>
                    </div>
                    {usuari == place.author.email &&
                    <div className='funciones'>
                        <Link className="iconos" to={"/places/edit/"+place.id} title="Editar"><i className="bi bi-pencil-square"></i></Link> 
                        <button onClick={(e) => {dispatch(delPlace(place.id, authToken));}} title="Eliminar" type="submit" className="delete iconos"><i className="bi bi-trash3"></i></button>
                    </div>}
                </div>
                <div>
                    <h5>{ place.name }</h5>
                </div>
            </div>
            <div>
                <Link to={"/places/"+place.id} title="Veure"><img className="imgpub" src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name}/></Link>
            </div>
            <div className="funct">
                <div className="functizq">
                    <i className="bi bi-star"></i>
                    <Link to={"/places/"+place.id}><i className="bi bi-chat"></i></Link>
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
        </>
    )
}

export default PlaceGrid