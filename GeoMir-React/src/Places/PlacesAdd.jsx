import React, { useEffect, useState, useContext } from 'react';
import "./PlacesAdd.css";
import { UserContext } from '../userContext';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addPlace } from "../slices/places/thunks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function PlacesAdd() {
  let { authToken, setAuthToken } = useContext(UserContext);
  const { error="", success="" } = useSelector((state) => state.places);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm();
  const onSubmit = data => dispatch(sendPlace(data));

  const sendPlace = async (data) => {
    const file = data.upload[0];
    const tiposArchivos = ["image/gif", "image/jpg", "image/png", "image/jpeg", "video/mp4"];
    if (! tiposArchivos.includes(file.type)) {
      setError('upload', {type: 'filetype', message:"Tipo de archivo incorrecto, solo acepta GIF, JPG, PNG, JPEG y MP4"})
    }else if(file.size > 2048000){
      setError('upload', {type: 'filesize', message:"El archivo no puede pesar mas de 2048KB"})
    }else{
      const data2 = { ...data, upload: data.upload[0]}
      dispatch(addPlace(data2, authToken, navigate));
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( (pos)=> {
      setValue('latitude', pos.coords.latitude)
      setValue('longitude', pos.coords.longitude)
      console.log("Latitude is :", pos.coords.latitude);
      console.log("Longitude is :", pos.coords.longitude);
    });
  }, [])

  return <div className="contenido contenidoaddplace">
            {success ? <div className="success">{success}</div> : <></>}
            <h1>PlaceAdd</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="material-form">
              <div className="material-form__container">
                <input {...register("name", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 4,
                      message: "El Nombre tiene que contener mínimo 4 caracteres"
                    },
                    maxLength: {
                      value: 255,
                      message: "El Nombre no puede contener más de 255 caracteres"
                    }})} className="material-form__input" type="text" placeholder=" " id="name"/>
                <label className="material-form__label" htmlFor="name">Nombre</label>
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Nombre no válido</p>
              </div>
              {errors.name ? <div className="error">{errors.name.message}</div> : <></>}
              <div className="material-form__container">
                <input {...register("description", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 4,
                      message: "La descripción tiene que contener mínimo 4 caracteres"
                    },
                    maxLength: {
                      value: 255,
                      message: "La descripción no puede contener más de 255 caracteres"
                    }})} className="material-form__input" type="text" placeholder=" " id="description"/>
                <label className="material-form__label" htmlFor="description">Descripción</label>
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Descripción no válido</p>
              </div>
              {errors.description ? <div className="error">{errors.description.message}</div> : <></>}
              <div className="material-form__container">
                <input {...register("upload", {required: "Este campo es obligatorio",})} className="material-form__input" type="file" placeholder=" " id="upload"/>
                <label className="material-form__label" htmlFor="upload">Archivo</label>
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Archivo no válida</p>
              </div>
              {errors.upload ? <div className="error">{errors.upload.message}</div> : <></>}
              <div className="material-form__container">
                <input {...register("latitude", {required: "Este campo es obligatorio",})}  className="material-form__input" type="number" placeholder=" " id="latitude" step={"any"}/>
                <label className="material-form__label" htmlFor="latitude">Latitud</label>
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Latitud no válida</p>
              </div>
              {errors.latitude ? <div className="error">{errors.latitude.message}</div> : <></>}
              <div className="material-form__container">
                <input {...register("longitude", {required: "Este campo es obligatorio",})}  className="material-form__input" type="number" placeholder=" " id="longitude" step={"any"}/>
                <label className="material-form__label" htmlFor="longitude">Longitud</label>
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Longitud no válido</p>
              </div>
              {errors.longitude ? <div className="error">{errors.longitude.message}</div> : <></>}
              <div className="material-form__container">
                <select {...register("visibility", {required: "Este campo es obligatorio",})} step={"any"} className="material-form__input visibilidad" id="visibility">
                  <option value="1" >Public</option>
                  <option value="3" >Private</option>
                  <option value="2" >Contacts</option>
                </select>
                <label className="material-form__label" htmlFor="visibility">Visibilidad</label>
                
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Visibilidad no válida</p>
              </div>
              {errors.visibility ? <div className="error">{errors.visibility.message}</div> : <></>}
              {error ? <div className="error">{error}</div> : <></>}
              <div className='botonera'>
                <button type="submit" className="material-form__button">Crear place</button>
                <button className="central material-form__button" type='reset'>Reiniciar</button>
                <Link to={"/places"} className="derecha material-form__button">Volver</Link>
              </div>
            </form>
          </div>;
  }