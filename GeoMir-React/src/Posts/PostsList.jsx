import React from "react";
import { UserContext } from "../userContext";
import { useContext, useEffect } from "react";
import "./PostsList.css";
import PostList from "./PostList";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../slices/posts/thunks";

const PostsList = () => {
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext);
  const { posts, page=0, isLoading=true, error="" } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts(0, authToken));
  }, []);

  return (
    <>
      {isLoading ? 
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
                {posts.map((post) => (
                  (post.visibility.name == 'public' || usuari == post.author.email) && 
                  (<tr key={post.id}><PostList post={post} /></tr>)
                ))}
              </tbody>
          </table>
        </div>
      )}
    </>


  )
}

export default PostsList