import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

export const postMark = ({ mark, delmark }) => {
  const dispatch = useDispatch();
  return (
    <>
      <td className="name">{mark.body}</td>
      <td><Link className="iconos" to={mark.ruta} title="Veure"><i className="bi bi-eye-fill"></i></Link></td>
      <td><button onClick={() => dispatch(delmark(mark.ruta))} className="delete iconos"><i className="bi bi-trash3-fill"></i></button></td> 
    </>
  );
};

export default postMark