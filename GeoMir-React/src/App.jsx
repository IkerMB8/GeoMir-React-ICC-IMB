import "./style.css";
import React from 'react'
import LoginRegister  from './auth/LoginRegister';
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./userContext";
import Header from './Layout/Header';
import Footer from "./Layout/Footer";
import About from "./About";
import PlaceList from "./Places/PlacesList";
import Place from "./Places/Place";
import PlaceAdd from "./Places/PlacesAdd";
import PlaceEdit from "./Places/PlacesEdit";
import PlaceGrid from "./Places/PlacesGrid";
import PlaceMenu from "./Places/PlacesMenu";
import Posts from "./Posts/Posts";
import NotFound from "./NotFound";

export default function App() {

  let [authToken, setAuthToken] = useState("");
  let [usuari, setUsuari] = useState("");

  return (
    <>
      <UserContext.Provider value= { { usuari, setUsuari,authToken,setAuthToken }}>
        {authToken ? (
          <>
            <Header />
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path="/" element={<Posts />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/places" element={<> <PlaceMenu/><PlaceList/> </>} />
              <Route path="/places/add" element={<> <PlaceMenu/><PlaceAdd/> </>} />
              <Route path="/places/grid" element={<> <PlaceMenu/><PlaceGrid /> </>} />
              <Route path="/places/:id" element={<> <PlaceMenu/><Place/> </>} />
              <Route path="/places/edit/:id" element={<> <PlaceMenu/><PlaceEdit/> </>} />
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
