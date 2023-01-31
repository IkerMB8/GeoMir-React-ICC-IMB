import "./style.css";
import React from 'react'
import LoginRegister  from './auth/LoginRegister';
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./userContext";
import Header from './Layout/Header';
import Footer from "./Layout/Footer";
import About from "./About";
import Places from "./Places/Places";
import Post from "./Posts/Post";
import PostsList from "./Posts/Posts";
import PostsGrid from "./Posts/PostsGrid";
import PostsAdd from "./Posts/PostsAdd";
import PostsEdit from "./Posts/PostsEdit";
import NotFound from "./NotFound";

export default function App() {

  let [authToken, setAuthToken] = useState("");

  return (
    <>
      <UserContext.Provider value={{ authToken, setAuthToken }} >
        {authToken ? (
          <>
            <Header />
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path="/" element={<PostsList />} />
              <Route path="/posts" element={<PostsList />} />
              <Route path="/posts/grid" element={<PostsGrid />} />
              <Route path="/posts/add" element={<PostsAdd />} />
              <Route path="/posts/:id" element={<Post/> } />
              <Route path="/posts/edit/:id" element={<PostsEdit />} />
              <Route path="/places" element={<Places />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <LoginRegister />
        )}
      </UserContext.Provider>
    </>
  );
}
