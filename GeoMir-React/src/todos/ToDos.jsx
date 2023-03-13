//REDUCER
// import React, { useEffect, useState, useReducer } from "react";
// import { ToDo } from "./ToDo";
// import { ToDoAdd } from "./ToDoAdd";
// import { todosReducer } from "./todoReducer";

// // Estat inicial del reducer. Buit
// const initialState = [];
// const init = () => {
//   // Si localstorage tornes null tornariem un array buit
//   return JSON.parse(localStorage.getItem("todos")) || [];
// };

// export const ToDos = () => {
//   let [notodo, setNoTodo] = useState(false);
//   const [todos, dispatchTodos] = useReducer(todosReducer, initialState, init);

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//     if (todos[0] == null){
//       setNoTodo(true);
//     }else{
//       setNoTodo(false);
//     }
//   }, [todos]);

//   const handleNewToDo = (todo) => {
//     console.log("Afegeixo");
//     console.log({ todo });

//     const action = {
//       type: "Add Todo",
//       payload: todo
//     };
//     dispatchTodos(action);
//   };

//   const handleDeleteToDo = (id) => {
//     console.log("Todo con ID " + id + " Eliminada");
//     dispatchTodos({
//       type: "Del Todo",
//       payload: id
//     });
//   };

//   const handleToggleTodo = (id) => {
//     dispatchTodos({
//       type: "Toggle Todo",
//       payload: id
//     });
//   };

//   console.log(todos);

//   return (
//     <>
//       <h1 style={{fontSize: '2.5em', margin:'25px'}}>TodosList</h1>
//       <ToDoAdd handle={handleNewToDo} />
//       <div className="container">
//         {notodo == false &&
//         <table className="tabla">
//           <thead>
//             <tr>
//               <th><h1>ID</h1></th>
//               <th><h1>Descripción</h1></th>
//               <th><h1>Estado</h1></th>
//               <th colSpan={4}><h1>ACTIONS</h1></th>
//             </tr>
//           </thead>
//           <tbody>
//             {todos.map((todo) => (
//               <tr  key={todo.id}><ToDo todo={todo} handleDelete={handleDeleteToDo} handleToggleTodo={handleToggleTodo} /></tr>
//             ))}
//           </tbody>
//         </table>}
//         {notodo == true &&
//           <div className="warning error">No hay tareas</div>
//         }


//       </div>
//     </>
    
//   );
// };


//REDUX
// export default ToDos
import React from "react";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { ToDo } from "./ToDo";
import { ToDoAdd } from "./ToDoAdd";
import { db } from "../firebase";
import {doc, getDocs, deleteDoc, addDoc, collection } from "firebase/firestore";
//import { todosReducer } from "./todosReducer";

// Estat inicial del reducer. Buit
// const initialState = [

// ];
// const init = ()=> {
//   // Si localstorage tornes null tornariem un array buit
//   return JSON.parse(localStorage.getItem("todos")) || []
// }

export const ToDos = () => {

  const { todos } = useSelector((state) => state.todos);
  const todosCollection = collection(db,"ToDos");
  const synchronize = async () => {
    // Obtenim tots els todos per adesprés esobrrar-los
    const dades = await getDocs(todosCollection);
    // Esborrem tots els todos
    // aquest sistema no es recomana en entorn web,
    // però no hi ha un altra opció
    dades.docs.map((v) => {
      deleteDoc(doc(db, "ToDos", v.id));
    });
    // Afegim tots els todos de nou
    todos.map((p) => {
      addDoc(todosCollection, {
        id: p.id,
        description: p.description,
        done: p.done,
      });
    });
  };
  useEffect(() => {
    // localStorage.setItem("todos", JSON.stringify(todos));
    synchronize();
  }, [todos]);

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
