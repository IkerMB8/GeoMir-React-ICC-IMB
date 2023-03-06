import React, { useEffect, useState, useReducer } from "react";
import { placeMarkReducer } from "./placeMarkReducer";
import PlaceMark from "./placeMark";

// Estat inicial del reducer. Buit
const initialState = [];
const init = () => {
  // Si localstorage tornes null tornariem un array buit
  return JSON.parse(localStorage.getItem("marks")) || [];
};

export const placeMarks = () => {
  let [noMark, setNoMark] = useState(false);
  const [marks, dispatchMarks] = useReducer(placeMarkReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("marks", JSON.stringify(marks));
    if (marks[0] == null){
        setNoMark(true);
    }else{
        setNoMark(false);
    }
  }, [marks]);

  const handleDelete = (ruta) => {
    console.log("Eliminada la marca del place " + ruta);
    dispatchMarks({
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
                {marks.map((mark) => (
                <tr key={mark.idplace}><PlaceMark mark={mark} handleDelete={handleDelete} /></tr>
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

export default placeMarks