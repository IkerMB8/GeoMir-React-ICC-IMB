import React from "react";

export const ToDo = ({ todo, handleDelete, handleToggleTodo }) => {
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
    <td style={{width:'120px'}}><button onClick={() => handleToggleTodo(todo.id)}>Cambiar estado</button></td>
    <td><button onClick={() => handleDelete(todo.id)} className="delete iconos"><i className="bi bi-trash3-fill"></i></button></td> 
    </>
  );
};

export default ToDo