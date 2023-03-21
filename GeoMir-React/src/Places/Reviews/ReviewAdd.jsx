import React, { useContext } from "react";
import { UserContext } from "../../userContext";
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../slices/places/reviews/thunks";
import { Link } from 'react-router-dom';
import "../PlacesAdd.css";

export const ReviewAdd = ({id}) => { 
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const dispatch = useDispatch();
  const { reviews=[], page=0, isLoading=true, add=true, error="", reviewsCount=0 } = useSelector((state) => state.reviews);
  const { formState, onInputChange, onResetForm } = useForm({
    review: "",
  });  
  const {review} = formState;

  return <div className="contenido contenidoaddplace">
          {/* {success ? <div className="success">{success}</div> : <></>} */}
          <h1>Add Review</h1>
          <form className="material-form">
            <div className="material-form__container">
              <input className="material-form__input" type="text" placeholder=" " id="review" name="review" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ 0-9 .,;:-_]{2,100}" maxLength="100" onChange={(e) => {onInputChange(e);}}/>
              <label className="material-form__label" htmlFor="review">Review</label>
              <div className="material-form__focus-animation"></div>
              <p className="material-form__error">Review no válida</p>
            </div>
            {error ? <div className="error">{error}</div> : <></>}
            <div className='botonera'>
              <button onClick={(e) =>dispatch(addReview(id,review,authToken))} type="button" className="material-form__button">Crear review</button>
              <button className="central material-form__button" onClick={(e) => {onResetForm();}} type='reset'>Reiniciar</button>
              <Link to={"/places"} className="derecha material-form__button">Volver</Link>
            </div>
          </form>
        </div>;
}
export default ReviewAdd