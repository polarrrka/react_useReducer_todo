import React, { useState } from "react";

export default function Todo({ todo, dispatch, ACTIONS }) {
  const [name, setName] = useState(todo.name);

  function handleEditSave(e) {
    e.preventDefault();
    dispatch({
      type: ACTIONS.UPDATE_TODO,
      payload: { name: name, id: todo.id }
    });
  }

  return (
    <div className="todo-container">
      <label
        className="todo"
        style={{
          color: todo.complete ? "grey" : "#333333",
          textDecoration: todo.complete ? "line-through" : ""
        }}
      >
        <input
          className="todo__checkbox"
          type="checkbox"
          onClick={() =>
            dispatch({
              type: ACTIONS.TOGGLE_TODO,
              payload: { id: todo.id }
            })
          }
        />

        <form
          onSubmit={handleEditSave}
          style={{ display: todo.edit ? "inline-block" : "none" }}
        >
          <input
            className="todo__edit-input"
            type="value"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
        </form>

        {todo.edit ? "" : todo.name}
      </label>
      <div className="btns">
        <button
          className="btn"
          onClick={() =>
            dispatch({
              type: ACTIONS.DELETE_TODO,
              payload: { id: todo.id }
            })
          }
        >
          ✖
        </button>
        <button
          className="btn"
          onClick={() => {
            todo.edit
              ? dispatch({
                  type: ACTIONS.UPDATE_TODO,
                  payload: { name: name, id: todo.id }
                })
              : dispatch({
                  type: ACTIONS.EDIT_TODO,
                  payload: { id: todo.id, name: todo.name }
                });
          }}
        >
          {todo.edit ? "✔" : "✎"}
        </button>
      </div>
    </div>
  );
}
