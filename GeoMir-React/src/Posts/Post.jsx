import React, { useReducer } from 'react';
import { UserContext } from "../userContext";
import { useParams, Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "./PostGrid.css";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
// import { postMarkReducer } from './postMarkReducer';
import { useDispatch, useSelector } from "react-redux";
import { addpostmark, delpostmark, comppostmark } from "../slices/postMarkSlice";
import { db } from "../firebase";
import {doc, getDocs, deleteDoc, addDoc, collection } from "firebase/firestore";

// const initialState = [];
// const init = () => {
//   return JSON.parse(localStorage.getItem("marks2")) || [];
// };

export default function Post() {
    const { pathname } = useLocation()
    // const [marks2, dispatchMarks2] = useReducer(postMarkReducer, initialState, init);
    let navigate = useNavigate();
    const { id } = useParams();
    let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
    let [like, setLike ] = useState(false);
    const { data, error, loading, setUrl, setOptions, refresh, setRefresh } = useFetch("https://backend.insjoaquimmir.cat/api/posts/"+id, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": 'Bearer '  + authToken,
      },
      method: "GET",
    });

    const { marks2, isMarked } = useSelector((state) => state.marks2);
    const dispatch = useDispatch();

    const placeMarksCollection2 = collection(db, "markPosts");
    const synchronize = async () => {
      // Obtenim tots els todos per adesprés esobrrar-los
      const dades = await getDocs(placeMarksCollection2);
      // Esborrem tots els todos
      // aquest sistema no es recomana en entorn web,
      // però no hi ha un altra opció
      dades.docs.map((v) => {
        deleteDoc(doc(db, "markPosts", v.id));
      });
      // Afegim tots els todos de nou
      marks2.map((p) => {
        addDoc(placeMarksCollection2, {
          idpost: p.idpost,
          body: p.body,
          ruta: p.ruta,
        });
      });
    };

    useEffect(() => {
        synchronize();
        // localStorage.setItem("marks2", JSON.stringify(marks2));
        dispatch(comppostmark(pathname));
    }, [marks2]);

    useEffect(()=>{
        comprobarLike();
    }, []);

    const handle = (body) => {
      console.log("Afegeixo marca al place amb ID "+id);
      const newMark = {
        idpost: id,
        body: body,
        ruta: pathname
      };
      console.log("Abans del dispatch");
      dispatch(addpostmark(newMark));
      // setMarked(true);
    };

    // const handle = (body) => {
    //   console.log("Afegeixo marca al post amb ID "+id);
    //   const newMark = {
    //     idpost: id,
    //     body: body,
    //     ruta: pathname,
    //   };
    //   const action = {
    //     type: "Add Mark",
    //     payload: newMark
    //   };
    //   dispatchMarks2(action);
    //   setMarked(true);
    // };
    
    // const handleDelete = () => {
    //   console.log("Eliminada la marca del post amb ruta" + pathname);
    //   dispatchMarks2({
    //     type: "Del Mark",
    //     payload: pathname
    //   });
    //   setMarked(false);
    // };

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
            <div className="contenido">
                <div className="posts">
                    <div className='post' key={data.id}>
                        <div className="topp">
                        <div className="cajatopp">
                            <div className="perf">
                            <img src={"https://backend.insjoaquimmir.cat/storage/" + data.file.filepath} alt={data.name}></img><p>@{data.author.name}</p>
                            </div>
                            {usuari == data.author.email &&
                            <div className='funciones'>
                                <Link className="iconos" to={"/posts/edit/"+data.id} title="Editar"><i className="bi bi-pencil-square"></i></Link> 
                                <button onClick={(e) => {deletePost(e, data.id);}} title="Eliminar" type="submit" className="delete iconos"><i className="bi bi-trash3"></i></button>
                            </div>}
                        </div>
                        <div>
                            <h5>{ data.body }</h5>
                        </div>
                        </div>
                        <div>
                            <Link to={"/posts/"+data.id} title="Veure"><img className="imgpub" src={"https://backend.insjoaquimmir.cat/storage/" + data.file.filepath} alt={data.name}/></Link>
                        </div>
                        <div className="funct">
                            <div className="functizq">
                                {like ? (
                                  <button onClick={(e) => {unlike(e, data.id);}} className="delete botonlike rojo"><i className="bi bi-heart-fill"></i></button>
                                ) : (
                                  <button onClick={(e) => {likePost(e, data.id);}} className="delete botonlike"><i className="bi bi-heart"></i></button>
                                )}
                                <Link to={"/posts/"+data.id+"/comments"}><i className="bi bi-chat"></i></Link>                        
                                <i className="bi bi-share"></i>
                            </div>
                            <div className="functder">
                                {isMarked ? (
                                  // <button onClick={() => handleDelete()} style={{backgroundColor:'transparent', border:'none'}}><i style={{fontSize:'2em', color:'#606468'}} className="bi bi-bookmark-check-fill"></i></button>
                                  <button onClick={() => dispatch(delpostmark(pathname))} style={{backgroundColor:'transparent', border:'none'}}><i style={{fontSize:'2em', color:'#606468'}} className="bi bi-bookmark-check-fill"></i></button>
                                ) : ( 
                                  // <button onClick={(e) => {handle(data.body);}} style={{backgroundColor:'transparent', border:'none'}}><i style={{fontSize:'2em', color:'#606468'}} className="bi bi-bookmark"></i></button>
                                  <button onClick={() => handle(data.body)} style={{backgroundColor:'transparent', border:'none'}}><i style={{fontSize:'2em', color:'#606468'}} className="bi bi-bookmark"></i></button>
                                )}  
                                <i className="bi bi-flag"></i>                            </div>
                            </div>
                        <div>
                            <p>{ data.likes_count } likes</p>
                            <p>{ data.description }</p>
                        </div>
                    </div>     
                </div>
            </div>
        )}
    </>
    )
}
