import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';
import { Link } from 'react-router-dom'
import { delPost } from "../slices/posts/thunks";
import { useDispatch } from "react-redux";

export default function PostList ({post})  {
  let { usuari, setUsuari ,authToken,setAuthToken } = useContext(UserContext)
  const dispatch = useDispatch();

  return (
    <>
      <td>{post.id}</td>
      <td >{post.body}</td>
      <td>{post.author.name}</td>
      <td>{post.latitude}</td>
      <td>{post.longitude}</td>
      <td>{post.visibility.name}</td>
      <td>{post.likes_count}</td>  
      <td><Link className="iconos" to={"/posts/"+post.id} title="Veure">👁️</Link></td>
      {usuari == post.author.email &&
        <td><Link className="iconos" to={"/posts/edit/"+post.id} title="Editar">📝</Link></td>
      }
      {usuari == post.author.email &&
        <td><button onClick={(e) => {dispatch(delPost(post.id, authToken));}} title="Eliminar" type="submit" className="delete iconos">❌</button></td>
      }
    </>
  )
}
