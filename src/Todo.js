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

        <form
          onSubmit={handleEditSave}
          style={{ display: todo.edit ? "inline-block" : "none" }}
        >
          <input
            type="value"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
        </form>

        {todo.edit ? "" : todo.name}

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
        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.EDIT_TODO,
              payload: { id: todo.id, name: todo.name }
            })
          }
        >
          edit
        </button>
      </li>
    </ul>
  );
}
