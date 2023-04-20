import React, { useEffect, useState, useContext } from 'react';
import "./PlacesAdd.css";
import { UserContext } from '../userContext';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlace, editPlace } from "../slices/places/thunks";

export default function PlacesEdit() {
  let navigate = useNavigate();
  const { id } = useParams();
  let [ formulari, setFormulari ] = useState({});
  let { authToken, setAuthToken }=useContext(UserContext);
  const dispatch = useDispatch();
  const { place, page=0, error="" } = useSelector((state) => state.places);
  

  useEffect(()=>{
    dispatch(getPlace(id,authToken));
  }, [])

  useEffect (()=> {
    console.log(place)
    setFormulari({
      name: place.name,
      description: place.description,
      upload: place.file,
      longitude: place.longitude,
      latitude: place.latitude,
      visibility: place.visibility.id
    })
  },[place])

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.type && e.target.type==="file")
    {
      setFormulari({
        ...formulari,
        [e.target.name] : e.target.files[0] 
      })
    } else {
      setFormulari({
        ...formulari,
        [e.target.name] : e.target.value
      })
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( (pos )=> {

      setFormulari({
        ...formulari,
        latitude :  pos.coords.latitude,
        longitude: pos.coords.longitude

      })
      
      console.log("Latitude is :", pos.coords.latitude);
      console.log("Longitude is :", pos.coords.longitude);
    });
  
  }, [])


  const sendPlaceEdit = async (e) => {
    e.preventDefault();
    dispatch(editPlace(formulari, authToken, id));
    navigate("/places/"+id)
  }

  return <div className="contenido contenidoaddplace">
            <h1>PlaceEdit</h1>
            <form method='POST' onSubmit={(e) => {sendPlaceEdit(e);}} className="material-form">
              <div className="material-form__container">
                <input className="material-form__input" type="text" placeholder=" " id="name" name="name" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ 0-9 .,;:-_]{4,40}" maxLength="40" value={formulari.name} onChange={handleChange}/>
                <label className="material-form__label" htmlFor="name">Nombre</label>
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Nombre no válido</p>
              </div>
              <div className="material-form__container">
                <input className="material-form__input" type="text" placeholder=" " id="description" name="description" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ 0-9 .,;:-_]{4,110}" maxLength="110" value={formulari.description} onChange={handleChange}/>
                <label className="material-form__label" htmlFor="description">Descripción</label>
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Descripción no válido</p>
              </div>
              <div className="material-form__container">
                <input className="material-form__input" type="file" placeholder=" " id="upload" name="upload" maxLength="40" onChange={handleChange}/>
                <label className="material-form__label" htmlFor="upload">Archivo</label>
                <div className="material-form__focus-animation"></div>
                {/* <p className="material-form__error">Archivo no válido</p> */}
              </div>
              <div className="material-form__container">
                <input className="material-form__input" type="number" placeholder=" " id="latitude" name="latitude" step={"any"} maxLength="40" value={formulari.latitude} onChange={handleChange}/>
                <label className="material-form__label" htmlFor="latitude">Latitud</label>
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Latitud no válida</p>
              </div>
              <div className="material-form__container">
                <input className="material-form__input" type="number" placeholder=" " id="longitude" name="longitude" step={"any"} maxLength="40" value={formulari.longitude} onChange={handleChange}/>
                <label className="material-form__label" htmlFor="longitude">Longitud</label>
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Longitud no válido</p>
              </div>
              <div className="material-form__container">
              <select step={"any"} className="material-form__input visibilidad" id="visibility" name="visibility" value={formulari.visibility} onChange={handleChange}>
                  <option value="1" >Public</option>
                  <option value="3" >Private</option>
                  <option value="2" >Contacts</option>
                </select>
                <label className="material-form__label" htmlFor="visibility">Visibilidad</label>
                
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Visibilidad no válida</p>
              </div>
              {error ? <div className="error">{error}</div> : <></>}
              <div className='botonera'>
                <button type="submit" className="material-form__button">Editar place</button>
                <button className="central material-form__button" type='reset'>Reiniciar</button>
                <Link to={"/places"} className="derecha material-form__button">Volver</Link>
              </div>
            </form>
          </div>;
  }