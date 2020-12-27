import React, { useState, useReducer } from "react";
import "./styles.css";

const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  EDIT_TODO: "edit-todo"
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });

    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);

    case ACTIONS.EDIT_TODO:
      return todos;
    default:
      return todos;
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false };
}

export default function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  }

  function handleEdit(e) {
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="value"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>

      {todos.map((todo) => {
        return (
          <ul>
            <li
              style={{
                color: todo.complete ? "grey" : "black"
              }}
            >
              <input
                type="checkbox"
                onClick={() =>
                  dispatch({
                    type: ACTIONS.TOGGLE_TODO,
                    payload: { id: todo.id }
                  })
                }
              />
              {todo.name}

              <button
                onClick={() =>
                  dispatch({
                    type: ACTIONS.DELETE_TODO,
                    payload: { id: todo.id }
                  })
                }
              >
                x
              </button>
              <button onClick={handleEdit}>edit</button>
            </li>
          </ul>
        );
      })}
    </>
  );
}
