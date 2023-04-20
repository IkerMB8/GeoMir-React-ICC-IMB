import React from 'react';
import { UserContext } from "../userContext";
import { useContext, useState, useEffect } from "react";
import "./PostGrid.css";
import PostGrid from './PostGrid';
import Paginate from './Paginate';
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../slices/posts/thunks";

export default function PostsGrid() {
  let { authToken, setAuthToken } = useContext(UserContext);
  const { posts, page=0, isLoading=true, error="", filter } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts(page, authToken));
  }, [page, filter]);

  return(
    <>
      {isLoading ? 
        <div className="contenidosvg">
          <svg  className="load" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" xmlSpace="preserve">
            <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
              <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25"  dur="0.6s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
      : error?.message || (
        <div className="contenido">
          <Paginate />
          <div className="posts">
              {posts.map((post) => (  
                  (<div className='post' key={post.id}><PostGrid post={post} /></div>) 
              ))} 
          </div>
          <Paginate />
        </div>
      )}
    </>
  );
}