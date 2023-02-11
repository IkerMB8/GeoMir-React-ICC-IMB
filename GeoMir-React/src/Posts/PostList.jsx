import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';
import { Link } from 'react-router-dom'


export default function PostList ({post})  {
  let { user, setUser,authToken,setAuthToken } = useContext(UserContext)

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
        <td><Link className="iconos" to={"/posts/edit/"+post.id} title="Editar">📝</Link></td>
        <td><Link className="iconos" to={"/posts/delete/"+post.id} title="Eliminar">❌</Link></td> 
    </>
  )
}
