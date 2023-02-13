import React from 'react';
import { UserContext } from "../userContext";
import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "./PostGrid.css";
import { useNavigate } from "react-router-dom";

export default function Post() {
    let navigate = useNavigate();
    const { id } = useParams();
    let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
    let [ post, setPost ] = useState({
        author:{name:""},
        body:"",
        latitude:"",
        longitude:"",
        likes_count:"",
        file:{filepath:""}
    });
    let [like, setLike ] = useState(false);
    let [refresh,setRefresh] = useState(false);

    
    const getPost = async () => {
        try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id, {
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
            setPost(resposta.data);  
            console.log(post); 
        }else{
            console.log("La resposta no ha triomfat");
            navigate("/posts");
        }            
        } catch {
        console.log("Error");
        }
    };

    useEffect(()=>{
        getPost();
    }, [refresh])
    useEffect(()=>{
        comprobarLike()
    }, []);

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
            navigate("/posts");
          }else{
            console.log("Error eliminando post");
            console.log(resposta.message);
          }            
        } catch {
          console.log("Error");
        }
    };
    
    const comprobarLike = async (e) => {
        try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id+"/likes", {
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": 'Bearer '  + authToken,
            },
            method: "POST",
        })
        const resposta = await data.json();
        console.log(resposta);
        if (resposta.success == true){
            setLike(false);
            unlike();
        }else{
            setLike(true);
        }            
        } catch {
        console.log("Error");
        }
    };

    const likePost = async (e) => {
        try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id+"/likes", {
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": 'Bearer '  + authToken,
            },
            method: "POST",
        })
        const resposta = await data.json();
        console.log(resposta);
        if (resposta.success == true){
            setLike(true);
        }else{
            console.log("Ya has dado like a este post");
            setLike(false);
        }            
        setRefresh(!refresh);
        } catch {
        console.log("Error");
        }
    };

    const unlike = async (e) => {
        try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id+"/likes", {
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
            setLike(false);
        }else{
            console.log("No le has dado like a este post");
        }            
        setRefresh(!refresh);
        } catch {
        console.log("Error");
        }
    };
    return (
    <>
    <div className="contenido">
        <div className="posts">
            <div className='post' key={post.id}>
                <div className="topp">
                <div className="cajatopp">
                    <div className="perf">
                    <img src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath} alt={post.name}></img><p>@{post.author.name}</p>
                    </div>
                    {usuari == post.author.email &&
                    <div className='funciones'>
                        <Link className="iconos" to={"/posts/edit/"+post.id} title="Editar"><i className="bi bi-pencil-square"></i></Link> 
                        <button onClick={(e) => {deletePost(e, post.id);}} title="Eliminar" type="submit" className="delete iconos"><i className="bi bi-trash3"></i></button>
                    </div>}
                </div>
                <div>
                    <h5>{ post.name }</h5>
                </div>
                </div>
                <div>
                    <Link to={"/posts/"+post.id} title="Veure"><img className="imgpub" src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath} alt={post.name}/></Link>
                </div>
                <div className="funct">
                    <div className="functizq">
                        {like == false &&
                        <button onClick={(e) => {likePost(e, post.id);}} className="delete botonlike"><i className="bi bi-heart"></i></button>}
                        {like == true &&
                        <button onClick={(e) => {unlike(e, post.id);}} className="delete botonlike rojo"><i className="bi bi-heart-fill"></i></button>}
                        <Link to={"/posts/"+post.id+"/comments"}><i className="bi bi-chat"></i></Link>                        
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
            </div>     
        </div>
    </div>
    </>
    )
}
