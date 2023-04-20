//REDUX
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToDo } from "./ToDo";
import { ToDoAdd } from "./ToDoAdd";
import { db } from "../firebase";
import {doc, getDocs, deleteDoc, addDoc, collection } from "firebase/firestore";
import { deltodo, toggletodo } from "../slices/todoSlice";

export const ToDos = () => {

  const { todos } = useSelector((state) => state.todos);

  return (
    <>
      <h1 style={{fontSize: '2.5em', margin:'25px'}}>TodosList</h1>
      <ToDoAdd/>
      <div className="container">
        {todos.length == 0 ? (
          <div className="warning error">No hay tareas</div>
        ) : (
          <table className="tabla">
              <thead>
                <tr>
                  <th><h1>ID</h1></th>
                  <th><h1>Descripción</h1></th>
                  <th><h1>Estado</h1></th>
                  <th colSpan={4}><h1>ACTIONS</h1></th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => (
                  <tr key={todo.id}><ToDo todo={todo}/></tr>
                ))}
              </tbody>
            </table>
        )}
            
      </div>
    </>
  );
};
export default ToDos;
