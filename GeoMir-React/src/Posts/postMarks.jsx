import React, { useEffect, useState, useReducer } from "react";
// import { postMarkReducer } from "./postMarkReducer";
import PostMark from "./postMark";
import { useSelector } from "react-redux";
import { addpostmark, delpostmark } from "../slices/posts/postMarkSlice";
import { db } from "../firebase";
import {doc, getDocs, deleteDoc, addDoc, collection } from "firebase/firestore";

// Estat inicial del reducer. Buit
// const initialState = [];
// const init = () => {
//   // Si localstorage tornes null tornariem un array buit
//   return JSON.parse(localStorage.getItem("marks2")) || [];
// };

export const postMarks = () => {
  const { marks2 } = useSelector((state) => state.marks2);
  let [noMark, setNoMark] = useState(false);
  // const [marks2, dispatchMarks2] = useReducer(postMarkReducer, initialState, init);
  const placeMarksCollection2 = collection(db, "markPosts");
  const synchronize = async () => {
    // Obtenim tots els todos per adesprés esobrrar-los
    const dades = await getDocs(placeMarksCollection2);
    // Esborrem tots els todos
    // aquest sistema no es recomana en entorn web,
    // però no hi ha un altra opció
    dades.docs.map((v) => {
      deleteDoc(doc(db, "markPosts", v.id));
    });
    // Afegim tots els todos de nou
    marks2.map((p) => {
      addDoc(placeMarksCollection2, {
        idpost: p.idpost,
        body: p.body,
        ruta: p.ruta,
      });
    });
  };

  useEffect(() => {
    synchronize();
    // localStorage.setItem("marks2", JSON.stringify(marks2));
    if (marks2[0] == null){
        setNoMark(true);
    }else{
        setNoMark(false);
    }
  }, [marks2]);

  // const handleDelete = (ruta) => {
  //   console.log("Eliminada la marca del post " + ruta);
  //   dispatchMarks2({
  //     type: "Del Mark",
  //     payload: ruta
  //   });
  // };

  return (
    <>
        <h1 style={{fontSize: '2.5em', margin:'25px'}}>Marcadores</h1>
        <div className="contenido">
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
                  <tr key={mark.idpost}><PostMark mark={mark} delmark={delpostmark} /></tr>
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