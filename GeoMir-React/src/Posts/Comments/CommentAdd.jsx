import React, { useEffect, useState, useContext } from 'react';
import "../PostsAdd.css";
import { UserContext } from '../../userContext';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
export const CommentAdd = ({refresh, setRefresh}) => {  
    const { id } = useParams();
    let [formulari, setFormulari] = useState({});
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");
    let {authToken, setAuthToken}=useContext(UserContext);
  
    const handleChange = (e) => {
        e.preventDefault();
        setFormulari({
            ...formulari,
            [e.target.name] : e.target.value
        })
    };

    const sendComment = async (e) => {
        e.preventDefault();
        let {comment}=formulari;
        console.log(formulari);

        var formData = new FormData();
        formData.append("comment", comment);

        try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id+"/comments", {
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
            setSuccess("Comment Creado Correctamente");
            setRefresh(!refresh);
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

    return <div className="contenido contenidoaddplace">
            {success ? <div className="success">{success}</div> : <></>}
            <h1>Add Comment</h1>
            <form method='POST' className="material-form">
              <div className="material-form__container">
                <input className="material-form__input" type="text" placeholder=" " id="comment" name="comment" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ 0-9 .,;:-_]{2,100}" maxLength="100" value={formulari.name} onChange={handleChange}/>
                <label className="material-form__label" htmlFor="comment">Comment</label>
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Comment no válido</p>
              </div>
              {error ? <div className="error">{error}</div> : <></>}
              <div className='botonera'>
                <button onClick={(e) => {sendComment(e);}} type="submit" className="material-form__button">Crear post</button>
                <button className="central material-form__button" type='reset'>Reiniciar</button>
                <Link to={"/posts"} className="derecha material-form__button">Volver</Link>
              </div>
            </form>
          </div>;
}
export default CommentAdd