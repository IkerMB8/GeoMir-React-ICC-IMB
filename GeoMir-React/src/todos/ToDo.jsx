import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deltodo, toggletodo } from "../slices/todoSlice";

export const ToDo = ({ todo }) => {
  // export const ToDo = ({ todo, handleToggleTodo,handleDeleteTodo}) => {
  //const { todos } = useSelector(state => state.todos)
  const dispatch = useDispatch();

  return (
    <>
      <td>{todo.id}</td>
      <td id={"title"+todo.id}>{todo.description}</td>
      <td>
        {todo.done ? (
          <span className="done">Done</span>
        ) : (
          <span className="notdone">Not Done</span>
        )}
      </td>
      {/* <td><Link to={"/todos/" +todo.id}> <i className="bi bi-eye-fill"></i></Link></td>
      <td><Link to={"/todos/edit/" +todo.id}><i className="bi bi-pencil-fill"></i></Link></td> */} 
      <td style={{width:'120px'}}><button onClick={() => dispatch(toggletodo(todo.id))}>Cambiar estado</button></td>
      <td><button onClick={() => dispatch(deltodo(todo.id))} className="delete iconos"><i className="bi bi-trash3-fill"></i></button></td> 
    </> 
  );
};
export default ToDo
