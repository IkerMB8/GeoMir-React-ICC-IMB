import React from 'react';
import { UserContext } from "../userContext";
import { useContext, useState, useEffect } from "react";
import "./PostGrid.css";
import PostGrid from './PostGrid';

export default function PostsGrid() {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [ posts, setPosts ] = useState([]);
  
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
  }, [])

  return(
    <>
      <div className="contenido">
        <div className="posts">
            {posts.map((post) => (  
                (<div className='post' key={post.id}><PostGrid post={post} /></div>) 
            ))} 
        </div>
      </div>
    </>
  );
}