import React from "react";
import { UserContext } from "../userContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./PostsList.css";
import PostList from "./PostList";
import useFetch from "../hooks/useFetch";

const PostsList = () => {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  const { data, error, loading, setUrl, setOptions, refresh, setRefresh } = useFetch("https://backend.insjoaquimmir.cat/api/posts", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": 'Bearer '  + authToken,
    },
    method: "GET",
  });

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
    <>
      {loading ? 
        <div className="contenidosvg">
          <svg  className="load" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="40px" height="40px" viewBox="0 0 50 50" xmlSpace="preserve">
          <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
            <animateTransform attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
      : error?.message || (
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
                  <th colSpan="3"><h1>Accions</h1></th>
                </tr>
              </thead>
              <tbody>
                {data.map((post) => (
                  (post.visibility.name == 'public' || usuari == post.author.email) && 
                  (<tr key={post.id}><PostList post={post} deletePost={deletePost}/></tr>)
                ))}
              </tbody>
          </table>
        </div>
      )}
    </>


  )
}

export default PostsList