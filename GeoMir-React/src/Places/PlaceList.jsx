import React from 'react';
import "./PlaceList.css";
import { Link } from 'react-router-dom';
import { UserContext } from "../userContext";
import { useContext } from "react";

export const PlaceList = ({place, deletePlace}) => {    
    let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
    return(
        <>
            <td className='num'>{place.id}</td>
            <td className='name'>{place.name}</td>
            <td className='description'>{place.description}</td>
            <td className='num'>{place.file.id}</td>
            <td className='num'>{place.latitude}</td>
            <td className='num'>{place.longitude}</td>
            <td className='visibilitat'>{place.visibility.name}</td>
            <td>{place.author.name}</td>
            <td className='num'>{place.favorites_count}</td>
                <td><Link className="iconos" to={"/places/"+place.id} title="Veure"><i className="bi bi-eye-fill"></i></Link></td>
            {usuari == place.author.email &&
                <td><Link className="iconos" to={"/places/edit/"+place.id} title="Editar"><i className="bi bi-pencil-square"></i></Link></td> 
            }
            {usuari == place.author.email &&
                <td><button onClick={(e) => {deletePlace(e, place.id);}} title="Eliminar" type="submit" className="delete iconos"><i className="bi bi-trash3"></i></button></td>
            }
        </>
    )
}

export default PlaceList