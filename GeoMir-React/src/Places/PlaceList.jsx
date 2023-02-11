import React from 'react';
import "./PlaceList.css";
import { Link } from 'react-router-dom';

export const PlaceList = ({place}) => {    
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
            <td><Link className="iconos" to={"/places/"+place.id} title="Veure">👁️</Link></td>
            <td><Link className="iconos" to={"/places/edit/"+place.id} title="Editar">📝</Link></td>
            {/* <td><Link className="iconos" to={"/places/delete/"+place.id} title="Eliminar">❌</Link></td> */}
        </>
    )
}

export default PlaceList