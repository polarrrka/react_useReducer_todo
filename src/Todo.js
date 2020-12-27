import React from "react";

export default function Todo({ todo, dispatch, ACTIONS }) {
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
        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.EDIT_TODO,
              payload: { id: todo.id }
            })
          }
        >
          edit
        </button>
      </li>
    </ul>
  );
}
