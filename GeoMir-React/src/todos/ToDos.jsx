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

// export default ToDos
import React from "react";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtodo } from "../slices/todoSlice";

import { ToDo } from "./ToDo";
import { ToDoAdd } from "./ToDoAdd";
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
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
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
