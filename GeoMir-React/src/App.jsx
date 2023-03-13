import "./style.css";
import React, { useEffect, useState } from 'react'
import LoginRegister  from './auth/LoginRegister';
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./userContext";
import Header from './Layout/Header';
import Footer from "./Layout/Footer";
import About from "./About";
import PlacesList from "./Places/PlacesList";
import Place from "./Places/Place";
import PlacesAdd from "./Places/PlacesAdd";
import PlacesEdit from "./Places/PlacesEdit";
import PlacesGrid from "./Places/PlacesGrid";
import PlacesMenu from "./Places/PlacesMenu";
import ReviewsList from "./Places/Reviews/ReviewsList";
import Post from "./Posts/Post";
import PostsList from "./Posts/PostsList";
import PostsGrid from "./Posts/PostsGrid";
import PostsAdd from "./Posts/PostsAdd";
import PostsEdit from "./Posts/PostsEdit";
import PostsMenu from "./Posts/PostsMenu";
import CommentsList from "./Posts/Comments/CommentsList";
import NotFound from "./NotFound";
import ToDos from "./todos/ToDos";
import PlaceMarks from "./Places/placeMarks";
import PostMarks from "./Posts/postMarks";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addtodo, resetState } from "./slices/todoSlice";

export default function App() {
  
  let [authToken, setAuthToken] = useState("");
  let [usuari, setUsuari] = useState("");
  const todosCollection = collection(db, "ToDos");
  const dispatch = useDispatch();
  const getTodos = async () => {
    dispatch(resetState());
    const dades = await getDocs(todosCollection);
    dades.docs.map((v) => {
      dispatch(addtodo(v.data()))
    });
  };
  useEffect(() => {
    getTodos();
  }, [usuari]);

  return (
    <>
      <UserContext.Provider value= { { usuari, setUsuari,authToken,setAuthToken }}>
        {authToken ? (
          <>
            <Header />
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path="/" element={<> <PostsMenu/> <PostsList /> </>} />
              <Route path="/posts" element={<> <PostsMenu/> <PostsList /> </>} />
              <Route path="/posts/grid" element={<> <PostsMenu/> <PostsGrid /> </>} />
              <Route path="/posts/add" element={<> <PostsMenu/> <PostsAdd /> </>} />
              <Route path="/posts/:id" element={<> <PostsMenu/> <Post/> </>} />
              <Route path="/posts/edit/:id" element={<> <PostsMenu/><PostsEdit /> </>} />
              <Route path="/posts/:id/comments" element={<> <PostsMenu/><CommentsList/> </>} />
              <Route path="/places" element={<> <PlacesMenu/><PlacesList/> </>} />
              <Route path="/places/add" element={<> <PlacesMenu/><PlacesAdd/> </>} />
              <Route path="/places/grid" element={<> <PlacesMenu/><PlacesGrid /> </>} />
              <Route path="/places/:id" element={<> <PlacesMenu/><Place/> </>} />
              <Route path="/places/edit/:id" element={<> <PlacesMenu/><PlacesEdit/> </>} />
              <Route path="/places/:id/reviews" element={<> <PlacesMenu/><ReviewsList/> </>} />
              <Route path="/todos" element={<> <ToDos/> </>} />
              <Route path="/places/marks" element={<> <PlacesMenu/><PlaceMarks/> </>} />
              <Route path="/posts/marks" element={<> <PostsMenu/><PostMarks/> </>} />
              {/* <Route path="/about" element={<About />} /> */}
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
