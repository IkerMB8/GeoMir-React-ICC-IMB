import React, { useContext, useState, useEffect }  from 'react';
import "./PostsAdd.css"
import { UserContext } from '../userContext';
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../slices/posts/thunks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function PostsAdd() {
  let { authToken, setAuthToken }=useContext(UserContext);
  const { error="", success="" } = useSelector((state) => state.posts);
  let [ formulari, setFormulari ] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm();
  const onSubmit = data => dispatch(sendPost(data));

  const sendPost = async (data) => {
    const file = data.upload[0];
    const tiposArchivos = ["image/gif", "image/jpg", "image/png", "image/jpeg", "video/mp4"];
    if (! tiposArchivos.includes(file.type)) {
      setError('upload', {type: 'filetype', message:"Tipo de archivo incorrecto, solo acepta GIF, JPG, PNG, JPEG y MP4"})
    }else if(file.size > 2048000){
      setError('upload', {type: 'filesize', message:"El archivo no puede pesar mas de 2048KB"})
    }else{
      const data2 = { ...data, upload: data.upload[0]}
      dispatch(addPost(data2, authToken, navigate));
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

  return (
  <>
  <div className="contenido">
    {success ? <div className="success">{success}</div> : <></>}
    <h1>PostAdd</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="material-form">
      <div className="material-form__container">
        <input className="material-form__input" {...register("body", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 4,
                      message: "El Nombre tiene que contener mínimo 4 caracteres"
                    },
                    maxLength: {
                      value: 255,
                      message: "El Nombre no puede contener más de 255 caracteres"
                    }})} type="text" placeholder=" " id="body"/>
        <label className="material-form__label" htmlFor="body">Body</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">Body no válido</p>
      </div>
      {errors.body ? <div className="error">{errors.body.message}</div> : <></>}
      <div className="material-form__container">
        <input className="material-form__input" {...register("upload", {required: "Este campo es obligatorio",})} type="file" placeholder=" " id="file"/>
        <label className="material-form__label" htmlFor="upload">File</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">File no válido</p>
      </div>
      {errors.upload ? <div className="error">{errors.upload.message}</div> : <></>}
      <div className="material-form__container">
        <input className="material-form__input" {...register("latitude", {required: "Este campo es obligatorio",})} type="number" placeholder=" " id="latitude" step={"any"}/>
        <label className="material-form__label" htmlFor="latitude">Latitude</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">Latitude no válido</p>
      </div>
      {errors.latitude ? <div className="error">{errors.latitude.message}</div> : <></>}
      <div className="material-form__container">
        <input className="material-form__input" {...register("longitude", {required: "Este campo es obligatorio",})} type="number" placeholder=" " id="longitude" step={"any"}/>
        <label className="material-form__label" htmlFor="longitude">Longitude</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">Longitude no válido</p>
      </div>
      {errors.longitude ? <div className="error">{errors.longitude.message}</div> : <></>}
      <div className="material-form__container">
        <select step={"any"} {...register("visibility", {required: "Este campo es obligatorio",})} className="material-form__input visibilidad" id="visibility">
          <option value="1" >Public</option>
          <option value="3" >Private</option>
          <option value="2" >Contacts</option>
        </select>
        <label className="material-form__label" htmlFor="pvisibility_id">Visibility ID</label>
        <p className="material-form__error">Visibility ID no válido</p>
      </div>
      {errors.visibility ? <div className="error">{errors.visibility.message}</div> : <></>}
      <div className='botones'>
        <button type="submit" className="boton aceptar">Create</button>
        <button type="reset" className="boton reset">Reset</button>
        <a href="/posts" className="boton">Volver</a>
      </div>
    </form>
    {error ? <div className="error">{error}</div> : <></>}
  </div>
  </>
  )
}