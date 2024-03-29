import React, { useEffect, useState, useReducer } from "react";
import PlaceMark from "./placeMark";
import { useSelector } from "react-redux";
import { addmark, delmark } from "../slices/places/placeMarkSlice";
import { db } from "../firebase";
import {doc, getDocs, deleteDoc, addDoc, collection } from "firebase/firestore";

export const placeMarks = () => {
  const { marks } = useSelector((state) => state.marks);
  let [noMark, setNoMark] = useState(false);
  const placeMarksCollection = collection(db, "markPlaces");
  const synchronize = async () => {
    const dades = await getDocs(placeMarksCollection);
    dades.docs.map((v) => {
      deleteDoc(doc(db, "markPlaces", v.id));
    });
    marks.map((p) => {
      addDoc(placeMarksCollection, {
        idplace: p.idplace,
        name: p.name,
        description: p.description,
        ruta: p.ruta,
      });
    });
  };

  useEffect(() => {
    synchronize();
    if (marks[0] == null){
        setNoMark(true);
    }else{
        setNoMark(false);
    }
  }, [marks]);

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
                {marks.map((mark) => (
                  <tr key={mark.idplace}><PlaceMark mark={mark} delmark={delmark} /></tr>
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