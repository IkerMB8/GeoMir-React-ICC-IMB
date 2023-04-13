import React from 'react'
import "./PostGrid.css";
import { Link } from 'react-router-dom';
import { UserContext } from "../userContext";
import { useContext } from "react";    
import { delPost } from "../slices/posts/thunks";
import { useDispatch } from "react-redux";

export const PostGrid = ({post}) => {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  const dispatch = useDispatch();
  
  return (
    <>
      <div className="topp">
        <div className="cajatopp">
          <div className="perf">
            <img src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath} alt={post.name}></img><p>@{post.author.name}</p>
          </div>
          {usuari == post.author.email &&
          <div className='funciones'>
            <Link className="iconos" to={"/posts/edit/"+post.id} title="Editar"><i className="bi bi-pencil-square"></i></Link> 
            <button onClick={(e) => {dispatch(delPost(post.id, authToken));}} title="Eliminar" type="submit" className="delete iconos"><i className="bi bi-trash3"></i></button>
          </div>}
        </div>
        <div>
          <h5>{ post.body }</h5>
        </div>
      </div>
      <div>
        <Link to={"/posts/"+post.id} title="Veure"><img className="imgpub" src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath} alt={post.name}/></Link>
      </div>
      <div className="funct">
        <div className="functizq">
          <i className="bi bi-heart"></i>
          <Link to={"/posts/"+post.id}><i className="bi bi-chat"></i></Link>
          <i className="bi bi-share"></i>
        </div>
        <div className="functder">
          <i className="bi bi-flag"></i>
        </div>
      </div>
      <div>
        <p>{ post.likes_count } likes</p>
        <p>{ post.description }</p>
      </div>
    </>
  )
}
export default PostGrid