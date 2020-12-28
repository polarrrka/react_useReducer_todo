import React, { useState, useReducer } from "react";
import Todo from "./Todo";
import "./styles.scss";

const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  EDIT_TODO: "edit-todo",
  UPDATE_TODO: "update-todo",
  CLEAR_TODOS: "clear-todos"
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];

    case ACTIONS.TOGGLE_TODO:
      const newTodos = todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
      newTodos.sort((a, b) => a.complete - b.complete);
      return newTodos;

    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);

    case ACTIONS.EDIT_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, edit: !todo.edit };
        }
        return todo;
      });

    case ACTIONS.UPDATE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return updateTodo(action.payload.name, action.payload.id);
        }
        return todo;
      });

    case ACTIONS.CLEAR_TODOS:
      return todos.filter((todo) => !todo.complete);

    default:
      return todos;
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false, edit: false };
}

function updateTodo(name, id) {
  return { id: id, name: name, complete: false, edit: false };
}

export default function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  }

  function handleClear(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.CLEAR_TODOS });
  }

  return (
    <div className="container">
      <div className="app">
        <h1> to.dos </h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="add-todo"
            type="text"
            value={name}
            placeholder="add task"
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn--add" onClick={(e) => handleSubmit(e)}>
            {" "}
            ✔{" "}
          </button>
        </form>

        {todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              setName={setName}
              dispatch={dispatch}
              ACTIONS={ACTIONS}
            />
          );
        })}

        <button className="btn-clear" onClick={handleClear}>
          clear completed
        </button>
      </div>
    </div>
  );
}
