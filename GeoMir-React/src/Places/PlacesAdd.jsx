import React, { useEffect, useState, useContext } from 'react';
import "./PlacesAdd.css";
import { UserContext } from '../userContext';
import { Link } from 'react-router-dom';

export default function PlacesAdd() {
  let [formulari, setFormulari] = useState({});
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");
  let {authToken, setAuthToken}=useContext(UserContext);
  let {name,description,upload,latitude,longitude,visibility=1}=formulari;

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

  const sendPlace = async (e) => {
    e.preventDefault();
    console.log(formulari);

    var formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("upload", upload);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "POST",
        body: formData

      })
      const resposta = await data.json();
      if (resposta.success === true){
        console.log(resposta);
        // alert("Place creado correctamente");
        setSuccess("Place Creado Correctamente");
        setFormulari({});
      }else{
        console.log(formulari)
        setError(resposta.message);
      } 
        
    }catch{
      console.log("Error");
      // alert("catch");
    }
  }

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

  return <div className="contenido contenidoadd">
            {success ? <div className="success">{success}</div> : <></>}
            <h1>PlaceAdd</h1>
            <form method='POST' className="material-form">
              <div className="material-form__container">
                <input className="material-form__input" type="text" placeholder=" " id="name" name="name" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ]{4,40}" maxLength="40" value={formulari.name} onChange={handleChange}/>
                <label className="material-form__label" htmlFor="name">Nombre</label>
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Nombre no válido</p>
              </div>
              <div className="material-form__container">
                <input className="material-form__input" type="text" placeholder=" " id="description" name="description" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ 0-9]{4,110}" maxLength="110" value={formulari.description} onChange={handleChange}/>
                <label className="material-form__label" htmlFor="description">Descripción</label>
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Descripción no válido</p>
              </div>
              <div className="material-form__container">
                <input className="material-form__input" type="file" placeholder=" " id="upload" name="upload" maxLength="40" onChange={handleChange}/>
                <label className="material-form__label" htmlFor="upload">Archivo</label>
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Archivo no válida</p>
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
                <button onClick={(e) => {sendPlace(e);}} type="submit" className="material-form__button">Crear place</button>
                <button className="central material-form__button" type='reset'>Reiniciar</button>
                <Link to={"/places"} className="derecha material-form__button">Volver</Link>
              </div>
            </form>
          </div>;
  }