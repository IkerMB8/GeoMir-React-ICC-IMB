import React, { useEffect, useState, useContext } from 'react';
import './PostsAdd.css';
import { UserContext } from '../userContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function PostsEdit(){
  let navigate = useNavigate();
  const { id } = useParams();
  let [formulari, setFormulari] = useState({});
  let [error, setError] = useState("");
  let {authToken, setAuthToken}=useContext(UserContext);
  
  const getPost = async () => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id, {
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
        setFormulari({
          body: resposta.data.body,
          upload: "",
          latitude: resposta.data.latitude,
          longitude: resposta.data.longitude,
          visibility: resposta.data.visibility.id,
        });
      }else{
        setError(resposta.message);
      }            
    } catch {
      console.log("Error");
    }
  };

  useEffect(()=>{
    getPost();
  }, [])

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

  const sendPostEdit = async (e) => {
    e.preventDefault();
    let {body,upload,latitude,longitude,visibility}=formulari;
    console.log(formulari);

    var formData = new FormData();
    formData.append("body", body);
    formData.append("upload", upload);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id, {
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
        alert("Post editado correctamente.");
        navigate("/posts")
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
  return (
  <>
  <div className="contenido">
    <h1>PostEdit</h1>
    <form method='POST' className="material-form">
      <div className="material-form__container">
        <input className="material-form__input" name="body" type="text" placeholder=" " id="body" pattern="[a-zA-Z ñÑáéíóúÁÉÍÓÚ]{10,40}" maxlength="40" value={formulari.body} onChange={handleChange}/>
        <label className="material-form__label" htmlFor="body">Body</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">Body no válido</p>
      </div>
      <div className="material-form__container">
        <input className="material-form__input" name="upload" type="file" placeholder=" " id="file" pattern="[a-zA-Z ñÑáéíóúÁÉÍÓÚ]{10,40}" maxlength="50" onChange={handleChange}/>
        <label className="material-form__label" htmlFor="upload">File</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">File no válido</p>
      </div>
      <div className="material-form__container">
        <input className="material-form__input" name="latitude" type="number" placeholder=" " id="latitude" maxlength="50" value={formulari.latitude} onChange={handleChange}/>
        <label className="material-form__label" htmlFor="latitude">Latitude</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">Latitude no válido</p>
      </div>
      <div className="material-form__container">
        <input className="material-form__input" name="longitude" type="number" placeholder=" " id="longitude" maxlength="50" value={formulari.longitude} onChange={handleChange}/>
        <label className="material-form__label" htmlFor="longitude">Longitude</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">Longitude no válido</p>
      </div>
      <div className="material-form__container">
        <select className="material-form__input" for="visibility" name="visibility" type="option" placeholder=" " id="visibility" value={formulari.visibility} onChange={handleChange}>
          <option>Public</option>
          <option>Private</option>
          <option>Contacts</option>
        </select>
        <label className="material-form__label" for="pvisibility_id">Visibility ID</label>
        <p className="material-form__error">Visibility ID no válido</p>
      </div>
      <div className='botones'>
        <button onClick={(e) => {sendPostEdit(e);}} type="submit" className="boton aceptar">Create</button>
        <button type="reset" className="boton reset">Reset</button>
        <a href="/posts" className="boton">Volver</a>
      </div>
    </form>
    {error ? <div className="error">{error}</div> : <></>}
  </div>
  </>
  )
}