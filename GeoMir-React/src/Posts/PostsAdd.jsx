import React from 'react'
import "./PostsAdd.css"
import { UserContext } from '../userContext';

export default function PostsAdd(){
  let [formulari, setFormulari] = useState({});
  let [error, setError] = useState("");
  let {authToken, setAuthToken}=useContext(UserContext);
  
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
  })}

  const sendPost = async (e) => {
    e.preventDefault();
    let {body,file,latitude,longitude,visibility=1}=formulari;
    console.log(formulari);

    var formData = new FormData();
    formData.append("body", body);
    formData.append("file", file);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    try {
      const data = await fetch ("https://backend.insjoaquimmir.cat/api/posts",{
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken 
        },
        method: "POST",
        body: formData,
      });
      const resposta = await data.json();
      if (resposta.success === true){
        console.log(resposta);
        alert("Post creado correctamente");
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
  }
  return (
  <>
  <div className="contenido">
    <h1>PostAdd</h1>
    <form method='POST' className="material-form">
      <div className="material-form__container">
        <input className="material-form__input" for="body" name="body" type="text" placeholder=" " id="body" pattern="[a-zA-Z ñÑáéíóúÁÉÍÓÚ]{10,40}" maxlength="40" value={formulari.body} onChange={handleChange}/>
        <label className="material-form__label" for="body">Body</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">Body no válido</p>
      </div>
      <div className="material-form__container">
        <input className="material-form__input" for="file" name="file" type="file" placeholder=" " id="file" pattern="[a-zA-Z ñÑáéíóúÁÉÍÓÚ]{10,40}" maxlength="50" value={formulari.file} onChange={handleChange}/>
        <label className="material-form__label" for="file">File</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">File no válido</p>
      </div>
      <div className="material-form__container">
        <input className="material-form__input" for="latitude" name="latitude" type="number" placeholder=" " id="latitude" maxlength="50" value={formulari.latitude} onChange={handleChange}/>
        <label className="material-form__label" for="latitude">Latitude</label>
        <div className="material-form__focus-animation"></div>
        <p className="material-form__error">Latitude no válido</p>
      </div>
      <div className="material-form__container">
        <input className="material-form__input" for="longitude" name="longitude" type="number" placeholder=" " id="longitude" maxlength="50" value={formulari.longitude} onChange={handleChange}/>
        <label className="material-form__label" for="longitude">Longitude</label>
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
        <button onClick={(e) => {sendPlace(e);}} type="submit" className="boton aceptar">Create</button>
        <button type="reset" className="boton reset">Reset</button>
        <a href="/posts" className="boton">Volver</a>
      </div>
    </form>
    {error ? <div className="error">{error}</div> : <></>}
  </div>
  </>
  )
}