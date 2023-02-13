import React from 'react';
import { UserContext } from "../../userContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentAdd from "./CommentAdd";
import Comment from "./Comment";

export default function CommentsList() {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  let [ comments, setComments ] = useState([]);
  const { id } = useParams();
  let [ commentAdd, setCommentAdd ] = useState(false);
  let [refresh,setRefresh] = useState(false);

  const getComments = async (e) => {
    try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id+"/comments", {
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
            console.log(resposta.data); 
            resposta.data.map((comment) => {
              if (usuari == comment.user.email){
                setCommentAdd(true);
              }
            });
            setComments(resposta.data);
        }else{
            console.log("La resposta no ha triomfat");
        }            
    } catch {
      console.log("Error");
    }
  };

  useEffect(()=>{
    getComments();
  }, [refresh])
    
  const deleteComment = async (e, idcom) => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id+"/comments/"+idcom, {
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
        setCommentAdd(false);
      }else{
        console.log("Error eliminando el comentario");
        console.log(resposta.message);
      }            
    } catch {
      console.log("Error");
    }
  };

  return(
    <>
      <div className="contenido">
        <div className="comments-container">
          <h1>Comments Post {id}</h1>
          <ul>
          {comments.map((comment) => (  
            (<li key={comment.id} id="comments-list" className="comments-list"><Comment comment={comment} deleteComment={deleteComment}/></li>)
          ))} 
          </ul>
        </div>
      </div>
      {commentAdd == false &&
        <div><CommentAdd refresh={refresh} setRefresh={setRefresh}/></div> 
      }
    </>
  );
}