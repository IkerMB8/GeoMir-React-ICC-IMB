import React from 'react';
import { Link } from 'react-router-dom';
import "./PostsMenu.css";
export default function PostsMenu() {
    return <div className='navPlace'>
              <Link to="/posts/add" className='navLink'>Afegir Entrada</Link>
              <Link to="/posts/grid" className='navLink'>Grid</Link>
              <Link to="/posts" className='navLink'>List</Link>
            </div>;
}