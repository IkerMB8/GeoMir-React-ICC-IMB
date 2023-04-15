import React, { useContext, useState, useEffect }  from 'react';
import "./PostsAdd.css"
import { UserContext } from '../userContext';
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../slices/posts/thunks";

export default function PostsAdd() {
  let { authToken, setAuthToken }=useContext(UserContext);
  const { error="", success="" } = useSelector((state) => state.posts);
  let [ formulari, setFormulari ] = useState({});
  const dispatch = useDispatch();

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

  const sendPost = async (e) => {
    e.preventDefault();
    dispatch(addPost(formulari, authToken));
    setFormulari({});
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( (pos)=> {
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
    {success ? <div className="success">{success}</div> : <></>}
    <h1>PostAdd</h1>
    <form method='POST' className="material-form">
      <div className="material-form__container">
        <input className="material-form__input" name="body" type="text" placeholder=" " id="body" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ 0-9 .,;:-_]{10,40}" maxLength="40" value={formulari.body} onChange={handleChange}/>
        <label className="material-form__label" htmlFor="body">Body</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">Body no válido</p>
      </div>
      <div className="material-form__container">
        <input className="material-form__input" name="upload" type="file" placeholder=" " id="file" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ 0-9 .,;:-_]{10,40}" maxLength="50" onChange={handleChange}/>
        <label className="material-form__label" htmlFor="upload">File</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">File no válido</p>
      </div>
      <div className="material-form__container">
        <input className="material-form__input" name="latitude" type="number" placeholder=" " id="latitude" step={"any"} maxLength="50" value={formulari.latitude} onChange={handleChange}/>
        <label className="material-form__label" htmlFor="latitude">Latitude</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">Latitude no válido</p>
      </div>
      <div className="material-form__container">
        <input className="material-form__input" name="longitude" type="number" placeholder=" " id="longitude" step={"any"} maxLength="50" value={formulari.longitude} onChange={handleChange}/>
        <label className="material-form__label" htmlFor="longitude">Longitude</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">Longitude no válido</p>
      </div>
      <div className="material-form__container">
        <select step={"any"} className="material-form__input visibilidad" id="visibility" name="visibility" value={formulari.visibility} onChange={handleChange}>
          <option value="1" >Public</option>
          <option value="3" >Private</option>
          <option value="2" >Contacts</option>
        </select>
        <label className="material-form__label" htmlFor="pvisibility_id">Visibility ID</label>
        <p className="material-form__error">Visibility ID no válido</p>
      </div>
      <div className='botones'>
        <button onClick={(e) => {sendPost(e);}} type="submit" className="boton aceptar">Create</button>
        <button type="reset" className="boton reset">Reset</button>
        <a href="/posts" className="boton">Volver</a>
      </div>
    </form>
    {error ? <div className="error">{error}</div> : <></>}
  </div>
  </>
  )
}