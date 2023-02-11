import React from 'react';
import { UserContext } from "../userContext";
import { useContext, useState, useEffect } from "react";
import "./PostGrid.css";
import PostGrid from './PostGrid';

export default function PostsGrid() {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [ posts, setPosts ] = useState([]);
  let [refresh,setRefresh] = useState(false);
  
  const getPosts = async (e) => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
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
        setPosts(resposta.data);  
        console.log(posts); 
      }else{
        console.log("La resposta no ha triomfat");
      }            
    } catch {
      console.log("Error");
    }
  };

  useEffect(()=>{
    getPosts();
  }, [refresh])

  const deletePost = async (e, id) => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": 'Bearer '  + authToken,
        },
        method: "DELETE",
    })
      const resposta = await data.json();
      console.log(resposta);
      if (resposta.success == true){
        setRefresh(!refresh);
      }else{
        console.log("Error eliminando post");
        console.log(resposta.message);
      }            
    } catch {
      console.log("Error");
    }
  };

  return(
    <>
      <div className="contenido">
        <div className="posts">
            {posts.map((post) => (  
                (<div className='post' key={post.id}><PostGrid post={post} deletePost={deletePost}/></div>) 
            ))} 
        </div>
      </div>
    </>
  );
}