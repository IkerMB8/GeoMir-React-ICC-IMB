import "../PostsAdd.css";
import React, { useContext } from "react";
import { UserContext } from "../../userContext";
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../slices/posts/comments/thunks";
import { Link } from 'react-router-dom';

export const CommentAdd = ({id}) => {  
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const dispatch = useDispatch();
  const { comments=[], page=0, isLoading=true, add=true, error="", commentsCount=0 } = useSelector((state) => state.comments);
  const { formState, onInputChange, onResetForm } = useForm({
    comment: "",
  });  
  const {comment} = formState;

  return <div className="contenido contenidoaddplace">
          {/* {success ? <div className="success">{success}</div> : <></>} */}
          <h1>Add Comment</h1>
          <form className="material-form">
            <div className="material-form__container">
              <input className="material-form__input" type="text" placeholder=" " id="comment" name="comment" pattern="[a-zA-Z ñÑáàéèíìóòúùÁÉÍÓÚÀÈÌÒÙ 0-9 .,;:-_]{2,100}" maxLength="100" onChange={(e) => {onInputChange(e);}}/>
              <label className="material-form__label" htmlFor="comment">Comment</label>
              <div className="material-form__focus-animation"></div>
              <p className="material-form__error">Comment no válido</p>
            </div>
            {error ? <div className="error">{error}</div> : <></>}
            <div className='botonera'>
              <button onClick={(e) =>dispatch(addComment(id,comment,authToken))} type="button" className="material-form__button">Crear comment</button>
              <button className="central material-form__button" onClick={(e) => {onResetForm();}} type='reset'>Reiniciar</button>
              <Link to={"/posts"} className="derecha material-form__button">Volver</Link>
            </div>
          </form>
        </div>;
}
export default CommentAdd