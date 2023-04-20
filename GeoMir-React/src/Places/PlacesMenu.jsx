import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./PlaceMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from '../userContext';
import { useForm } from '../hooks/useForm';
import { setFilter } from '../slices/places/placeSlice';

export default function PlaceMenu(){
    const dispatch = useDispatch();
    const { formState, onInputChange, onResetForm } = useForm({
      search: "",
    });  
    let { idUsuari } = useContext(UserContext);
    const { filter } = useSelector((state) => state.places);
    const { search } = formState;
    return <div className='navPlace'>
              <div className='navLinks'>
                <Link to="/places/add" className='navLink'>Afegir Entrada</Link>
                <Link to="/places/grid" className='navLink'>Grid</Link>
                <Link to="/places" className='navLink'>List</Link>
                <Link to="/places/marks" className='navLink'>Marks</Link>
              </div>
              <div className="search-container">
                <form>
                  <input type="text" placeholder="Search..." name="search" value={search} onChange={onInputChange}/>
                  <button title={"Buscar"} onClick={(e) => { e.preventDefault(); dispatch(setFilter({...filter,description:search}));}}><i className="bi bi-search"></i></button>
                  <button title={"Mis Places"} className="user" onClick={(e) => { e.preventDefault(); dispatch(setFilter({...filter,author:idUsuari}));}}><i className="bi bi-person"></i></button>
                  <button title={"Reiniciar"} className="ultimoBotón"  onClick={(e) => { e.preventDefault(); dispatch(setFilter({...filter,author:"",description:""})), onResetForm()}}><i className="bi bi-arrow-clockwise"></i></button>
                </form>
              </div>  
            </div>;
}