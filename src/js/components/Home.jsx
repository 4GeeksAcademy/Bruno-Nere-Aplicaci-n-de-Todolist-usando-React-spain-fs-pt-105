import React, {useState} from "react";
import TodoItem from "./TodoItem";
import "../../styles/index.css";

function Home() {
	const [tasks, setTasks] = useState ([]);
	const [input, setInput] = useState("");

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && input.trim() !== "") {
			setTasks([...tasks, input.trim()]);
			setInput("");
		}
	};
	const deleteTask = (index) => {
		setTasks(tasks.filter((_, i) => i !== index));
	};
	return (
		<div className="todo-container">
			<h1>TODOS</h1>
			<input
			type="text"
			placeholder="Añadir tarea"
			value={input}
			onChange={(e) => setInput(e.target.value)}
			onKeyDown={handleKeyDown}
			/>
			<ul>
				{tasks.length === 0 ? (
					<li className="empty">No hay tareas, añadir tareas</li>
				) : (
					tasks.map((task, index) => (
						<TodoItem key={index} task={task} index={index} onDelete={deleteTask} />
					))
					)}
			</ul>
		</div>
	);
}

export default Home;