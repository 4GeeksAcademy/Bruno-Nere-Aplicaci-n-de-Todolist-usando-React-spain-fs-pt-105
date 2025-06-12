import React, {useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "../../styles/index.css";

const USER = "brunonere";
const API_URL = `https://playground.4geeks.com/todo/users/${USER}`;
const POST_URL = `https://playground.4geeks.com/todo/todos/${USER}`;

function Home() {
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState("");

	useEffect(() => {
		getTasks();
	}, []);

	const getTasks = () => {
		fetch(API_URL)
			.then(res => res.json())
			.then(data => {
				if (Array.isArray(data.todos)) {
					setTasks(data.todos);
				}
			})
			.catch(err => console.error("Error al cargar tareas:", err));
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && input.trim() !== "") {
			const newTask = {
				label: input.trim(),
				is_done: false
			};

			fetch(POST_URL, {
				method: "POST",
				body: JSON.stringify(newTask),
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then((res) => {
				if (!res.ok) throw new Error("error al guardar tarea");
				return res.json();
			})
			.then(() => {
				setInput("");
				getTasks();
			})
			.catch((err) => console.error(err));
		}
	};

	const deleteTask = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		})
		.then(() => getTasks())
		.catch((err) => console.error("Error al eliminar tarea:", err));
	};

	const clearAllTasks = () => {
		const deletePromises = tasks.map(task =>
			fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
				method: "DELETE"
			})
		);
		Promise.all(deletePromises)
			.then(() => getTasks())
			.catch(err => console.error("Error al limpiar tareas:", err));
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
					<li className="empty"> No hay tareas, añadir tareas</li>
				) : (
					tasks.map((task) => (
						<TodoItem key={task.id} task={task} onDelete={deleteTask} />
					))
				)}
			</ul>
			<div className="contador">
				{tasks.length}
			</div>
			{tasks.length > 0 && (
				<button className="clear-btn" onClick={clearAllTasks}>
					Limpiar todas las tareas
				</button>
			)}
		</div>
	);
}

export default Home;
