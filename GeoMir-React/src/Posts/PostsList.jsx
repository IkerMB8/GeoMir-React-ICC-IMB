import React from "react";
import { UserContext } from "../userContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./PostsList.css";
import PostList from "./PostList";

const PostsList = () => {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  let [ posts, setPosts ] = useState([]);
  let [refresh,setRefresh] = useState(false);


  const getPosts = async () => {
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
        if (resposta.success == true )
        {
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

  return (
    <div className='container'>
      <table className="table">
          <thead>
            <tr>
              <th><h1>ID</h1></th>
              <th className="bodyth"><h1>Body</h1></th>
              <th><h1>Author</h1></th>
              <th><h1>Latitude </h1></th>
              <th><h1>Longitude</h1></th>
              <th><h1>Visibilty</h1></th>
              <th><h1>Likes</h1></th>
              <th colspan="3"><h1>Accions</h1></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              (post.visibility.name == 'public' || usuari == post.author.email) && 
              (<tr key={post.id}><PostList post={post} deletePost={deletePost}/></tr>)
            ))}
          </tbody>

      </table>
    </div>


  )
}

export default PostsList