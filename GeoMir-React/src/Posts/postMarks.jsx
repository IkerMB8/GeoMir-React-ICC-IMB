import React, { useEffect, useState, useReducer } from "react";
import { postMarkReducer } from "./postMarkReducer";
import PostMark from "./postMark";

// Estat inicial del reducer. Buit
const initialState = [];
const init = () => {
  // Si localstorage tornes null tornariem un array buit
  return JSON.parse(localStorage.getItem("marks2")) || [];
};

export const postMarks = () => {
  let [noMark, setNoMark] = useState(false);
  const [marks2, dispatchMarks2] = useReducer(postMarkReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("marks2", JSON.stringify(marks2));
    if (marks2[0] == null){
        setNoMark(true);
    }else{
        setNoMark(false);
    }
  }, [marks2]);

  const handleDelete = (ruta) => {
    console.log("Eliminada la marca del post " + ruta);
    dispatchMarks2({
      type: "Del Mark",
      payload: ruta
    });
  };

  return (
    <>
        <h1 style={{fontSize: '2.5em', margin:'25px'}}>Marcadores</h1>
        <div className="container">
            {noMark == false &&
            <table className="tabla">
            <thead>
                <tr>
                <th><h1>Nombre</h1></th>
                <th><h1>Descripción</h1></th>
                <th colSpan={4}><h1>ACTIONS</h1></th>
                </tr>
            </thead>
            <tbody>
                {marks2.map((mark) => (
                <tr key={mark.idpost}><PostMark mark={mark} handleDelete={handleDelete} /></tr>
                ))}
            </tbody>
            </table>}
            {noMark == true &&
            <div className="warning error">No Tienes Ninguna Pagina Marcada</div>
            }
        </div>
    </>
  );
};

export default postMarks