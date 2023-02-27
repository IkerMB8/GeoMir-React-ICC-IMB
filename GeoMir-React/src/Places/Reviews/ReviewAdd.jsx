import React, { useEffect, useState, useContext } from 'react';
import "../PlacesAdd.css";
import { UserContext } from '../../userContext';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
export const ReviewAdd = ({refresh, setRefresh}) => {  
    const { id } = useParams();
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");
    let {authToken, setAuthToken}=useContext(UserContext);
    const { formState, onInputChange, onResetForm } = useForm({
      review: "",
    });  
    const {review} = formState;

    const sendReview = async (e) => {
        e.preventDefault();
        console.log(formState);

        var formData = new FormData();
        formData.append("review", review);

        try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id+"/reviews", {
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
            setSuccess("Review Creada Correctamente");
            setRefresh(!refresh);
        }else{
            setError(resposta.message);
        } 
            
        }catch{
        console.log("Error");
        // alert("catch");
        }
    }

    return <div className="contenido contenidoaddplace">
            {success ? <div className="success">{success}</div> : <></>}
            <h1>Add Review</h1>
            <form method='POST' className="material-form">
              <div className="material-form__container">
                <input className="material-form__input" type="text" placeholder=" " id="review" name="review" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ 0-9 .,;:-_]{2,100}" maxLength="100" onChange={(e) => {onInputChange(e);}}/>
                <label className="material-form__label" htmlFor="review">Review</label>
                <div className="material-form__focus-animation"></div>
                <p className="material-form__error">Review no válida</p>
              </div>
              {error ? <div className="error">{error}</div> : <></>}
              <div className='botonera'>
                <button onClick={(e) => {sendReview(e);}} type="submit" className="material-form__button">Crear review</button>
                <button className="central material-form__button" onClick={(e) => {onResetForm();}} type='reset'>Reiniciar</button>
                <Link to={"/places"} className="derecha material-form__button">Volver</Link>
              </div>
            </form>
          </div>;
}
export default ReviewAdd