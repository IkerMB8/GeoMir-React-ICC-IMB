import React, { useReducer } from 'react';
import { UserContext } from "../userContext";
import { useParams, Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "./PostGrid.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addpostmark, delpostmark, comppostmark } from "../slices/posts/postMarkSlice";
import { db } from "../firebase";
import { doc, getDocs, deleteDoc, addDoc, collection } from "firebase/firestore";
import CommentsList from "./Comments/CommentsList";
import { getPost, delPost, likePost, unlike, comprobarLike } from "../slices/posts/thunks";

export default function Post() {
  const { pathname } = useLocation()
  let navigate = useNavigate();
  const { id } = useParams();
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  const { post, page = 0, isLoading = true, error = "", like } = useSelector((state) => state.posts);

  const { marks2, isMarked } = useSelector((state) => state.marks2);
  const dispatch = useDispatch();

  const postMarksCollection = collection(db, "markPosts");
  const synchronize = async () => {
    const dades = await getDocs(postMarksCollection);
    dades.docs.map((v) => {
      deleteDoc(doc(db, "markPosts", v.id));
    });
    // Afegim tots els todos de nou
    marks2.map((p) => {
      addDoc(postMarksCollection, {
        idpost: p.idpost,
        body: p.body,
        ruta: p.ruta,
      });
    });
  };

  useEffect(() => {
    synchronize();
    dispatch(comppostmark(pathname));
  }, [marks2]);

  useEffect(() => {
    dispatch(comprobarLike(id, authToken));
  }, []);

  useEffect(() => {
    dispatch(getPost(id, authToken));
  }, [like]);

  const handle = (body) => {
    console.log("Afegeixo marca al place amb ID " + id);
    const newMark = {
      idpost: id,
      body: body,
      ruta: pathname
    };
    console.log("Abans del dispatch");
    dispatch(addpostmark(newMark));
    // setMarked(true);
  };

  const deletePost = async (e) => {
    dispatch(delPost(post.id, authToken));
    navigate("/posts");
  };

  return (
    <>
      {isLoading ?
        <div className="contenidosvg">
          <svg className="load" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" xmlSpace="preserve">
            <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
              <animateTransform attributeType="xml" attributeName="transform" type="rotate" to="360 25 25" dur="0.6s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
        : error?.message || (
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
                        <Link className="iconos" to={"/posts/edit/" + post.id} title="Editar"><i className="bi bi-pencil-square"></i></Link>
                        <button onClick={(e) => { deletePost(e, post.id); }} title="Eliminar" type="submit" className="delete iconos"><i className="bi bi-trash3"></i></button>
                      </div>}
                  </div>
                  <div>
                    <h5>{post.body}</h5>
                  </div>
                </div>
                <div>
                  <Link to={"/posts/" + post.id} title="Veure"><img className="imgpub" src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath} alt={post.name} /></Link>
                </div>
                <div className="funct">
                  <div className="functizq">
                    {like ? (
                      <button onClick={(e) => { dispatch(unlike(post.id, authToken)); }} className="delete botonlike rojo"><i className="bi bi-heart-fill"></i></button>
                    ) : (
                      <button onClick={(e) => { dispatch(likePost(post.id, authToken)); }} className="delete botonlike"><i className="bi bi-heart"></i></button>
                    )}
                    <Link to={"/posts/" + post.id + "/comments"}><i className="bi bi-chat"></i></Link>
                    <i className="bi bi-share"></i>
                  </div>
                  <div className="functder">
                    {isMarked ? (
                      // <button onClick={() => handleDelete()} style={{backgroundColor:'transparent', border:'none'}}><i style={{fontSize:'2em', color:'#606468'}} className="bi bi-bookmark-check-fill"></i></button>
                      <button onClick={() => dispatch(delpostmark(pathname))} style={{ backgroundColor: 'transparent', border: 'none' }}><i style={{ fontSize: '2em', color: '#606468' }} className="bi bi-bookmark-check-fill"></i></button>
                    ) : (
                      // <button onClick={(e) => {handle(post.body);}} style={{backgroundColor:'transparent', border:'none'}}><i style={{fontSize:'2em', color:'#606468'}} className="bi bi-bookmark"></i></button>
                      <button onClick={() => handle(post.body)} style={{ backgroundColor: 'transparent', border: 'none' }}><i style={{ fontSize: '2em', color: '#606468' }} className="bi bi-bookmark"></i></button>
                    )}
                    <i className="bi bi-flag"></i>                            </div>
                </div>
                <div>
                  <p>{post.likes_count} likes</p>
                  <p>{post.description}</p>
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <CommentsList id={id} comments_count={post.comments_count} />
            </div>
          </div>
        )}
    </>
  )
}
