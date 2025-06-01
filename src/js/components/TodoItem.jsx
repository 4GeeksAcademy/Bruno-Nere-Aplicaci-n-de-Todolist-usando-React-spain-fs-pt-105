import React, { useState } from "react";

function TodoItem ({ task, index, onDelete }) {
    const [hover, setHover] = useState(false);
    return (
        <li
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        >
        {task}
        {hover && (
            <button
                onClick={() => onDelete(index)} className="delete-btn"
            >X</button>
        )}
        </li>
    );
}
export default TodoItem;