import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./PostsMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from '../userContext';
import { useForm } from '../hooks/useForm';
import { setFilter } from '../slices/posts/postSlice';

export default function PostsMenu() {
  const dispatch = useDispatch();
  const { formState, onInputChange, onResetForm } = useForm({
    search: "",
  }); 
  let { idUsuari } = useContext(UserContext);
  const { filter } = useSelector((state) => state.posts);
  const { search } = formState;
  return <div className='navPlace'>
            <div className='navLinks'>
              <Link to="/posts/add" className='navLink'>Afegir Entrada</Link>
              <Link to="/posts/grid" className='navLink'>Grid</Link>
              <Link to="/posts" className='navLink'>List</Link>
              <Link to="/posts/marks" className='navLink'>Marks</Link>
            </div>
            <div className="search-container">
              <form>
                <input type="text" placeholder="Search..." name="search" value={search} onChange={onInputChange}/>
                <button title={"Buscar"} onClick={(e) => { e.preventDefault(); dispatch(setFilter({...filter,body:search}));}}><i className="bi bi-search"></i></button>
                <button title={"Mis Posts"} className="user" onClick={(e) => { e.preventDefault(); dispatch(setFilter({...filter,author:idUsuari}));}}><i className="bi bi-person"></i></button>
                <button title={"Reiniciar"} className="ultimoBotón"  onClick={(e) => { e.preventDefault(); dispatch(setFilter({...filter,author:"",body:""})), onResetForm()}}><i className="bi bi-arrow-clockwise"></i></button>
              </form>
            </div>  
          </div>;
}