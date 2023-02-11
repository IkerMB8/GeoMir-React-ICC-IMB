import React from 'react'
import "./PostGrid.css";
import { Link } from 'react-router-dom';

export const PostGrid = ({post}) => {
  
  return (
    <>
      <div className="topp">
        <div className="cajatopp">
          <div className="perf">
            <img src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath} alt={post.name}></img><p>@{post.author.name}</p>
          </div>
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
          <i className="bi bi-heart"></i>
          <i className="bi bi-chat"></i>
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
    </>
  )
}
export default PostGrid