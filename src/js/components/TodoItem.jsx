import React from "react";

function TodoItem({ task, onDelete }) {
  return (
    <li>
      {task.label}
      <button className="delete-btn" onClick={() => onDelete(task.id)}>❌</button>
    </li>
  );
}

export default TodoItem;