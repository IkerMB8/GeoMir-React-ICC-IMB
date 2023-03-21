import React from 'react';
import { UserContext } from "../../userContext";
import { useContext, useState, useEffect } from "react";
import CommentAdd from "./CommentAdd";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { setCommentsCount } from "../../slices/posts/comments/commentslice";
import { getComments } from "../../slices/posts/comments/thunks";

export const CommentsList = ({ id, comments_count }) => {
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const dispatch = useDispatch();
  const { comments=[], page=0, isLoading=true, add=true, error="", commentsCount=0 } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(setCommentsCount(comments_count))
    dispatch(getComments(0, id, authToken,usuari));
  }, []);


  return(
    <>
      <div className="contenido">
        <div className="comments-container">
          <h1>Comments Post {id}</h1>
          <ul>
          {comments.map((comment) => (  
            (<li key={comment.id} id="comments-list" className="comments-list"><Comment comment={comment} /></li>)
          ))} 
          </ul>
        </div>
      </div>
      {add == true &&
        <div><CommentAdd id={id}/></div> 
      }
    </>
  );
}

export default CommentsList