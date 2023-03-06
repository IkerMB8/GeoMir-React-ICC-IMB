import React from 'react';
import { Link } from 'react-router-dom';
import "./PlaceMenu.css";
export default function PlaceMenu() {
    return <div className='navPlace'>
              <Link to="/places/add" className='navLink'>Afegir Entrada</Link>
              <Link to="/places/grid" className='navLink'>Grid</Link>
              <Link to="/places" className='navLink'>List</Link>
              <Link to="/places/marks" className='navLink'>Marks</Link>
            </div>;
  }
