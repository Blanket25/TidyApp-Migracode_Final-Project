import "../index.css";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import emailjs from "emailjs-com";
function TasksInfo() {
	const [tasks, setTasks] = useState([]);
	const [validationError, setValidationError] = useState("");
	const navigate = useNavigate();
	const { state } = useLocation();
	const { roomies, newGroupData } = state;
	const number = roomies.length + 1;
	let allgroupMembers = [];
	const idFromStorage = localStorage.getItem("groupId");
	useEffect(() => {
		const emptyTasks = new Array(number).fill().map(() => ({
			taskName: "",
			description: "",
		}));

		setTasks(emptyTasks);
	}, [number]);

	const handleTask = (attribute, newValue, index) => {
		const newTasks = [...tasks];
		const newTask = { ...tasks[index] };
		newTask[attribute] = newValue;
		newTasks[index] = newTask;
		setTasks(newTasks);
	};
	async function fetchUsers() {
		roomies.forEach((roomie) => (roomie.group_id = idFromStorage));
		roomies.forEach((roomie) => (roomie.password = newGroupData.secret));
		allgroupMembers = [
			...roomies,
			{
				username: newGroupData.username,
				email: newGroupData.email,
				type_of_user: `admin`,
				group_id: idFromStorage,
				password: newGroupData.password,
			},
		];
		const response = await fetch("http://localhost:4000/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				allgroupMembers,
			}),
		});
		if (!response.ok) throw Error(response.message);
		try {
			const data = await response.json();
			return data;
		} catch (err) {
			throw err;
		}
	}

	async function fetchTasks(data) {
		const ids = data.map((data) => data.id);
		const response = await fetch("http://localhost:4000/tasks", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(
				tasks.map((task, index) => ({
					name: task.taskName,
					task_completed: false,
					description: task.description,
					starting_date: new Date(),
					group_id: idFromStorage,
					user_id: ids[index],
				}))
			),
		});
		if (!response.ok) throw Error(response.message);
		try {
			const data = await response.json();
			return data;
		} catch (err) {
			throw err;
		}
	}

	const handleClick = async () => {
		const isValid = tasks.every((task) => task.taskName !== "");
		if (isValid) {
			fetchUsers();
			fetchTasks();
			roomies.forEach((roomie) => {
				emailjs
					.send(
						"service_kbjdvl4",
						"template_k7fxp8r",
						{
							to_name: roomie.username,
							link: `http://localhost:3000/board/${idFromStorage}`,
							to_email: roomie.email,
							admin_name: newGroupData.username,
							group_name: newGroupData.group,
							group_secret: newGroupData.secret,
						},
						"user_qM5g1zhJlzTpO2v22X8WF"
					)
					.then(
						(response) => {
							console.log("SUCCESS!", response.status, response.text);
						},
						(err) => {
							console.log("FAILED...", err);
						}
					);
			});
			const response = await fetch(
				`http://localhost:4000/users/${idFromStorage}`,
				{
					method: "GET",
				}
			);
			if (!response.ok) throw Error(response.message);
			try {
				const data = await response.json();
				fetchTasks(data);
				navigate(`/board/${idFromStorage}`);
			} catch (err) {
				throw err;
			}
		} else {
			setValidationError("You're missing a roomie!");
		}
	};

	return (
		<div>
			<Nav />
			<div className='tasks-card-container'>
				<div className='task-card u-box-shadow'>
					<p>
						Now, Since there are {number} people living in your house, you
						should define {number} main tasks
					</p>

					{tasks.map((n, index) => (
						<div key={`input-${index}`}>
							<p className='text-bold'>Task {index + 1}</p>
							<input
								name={`name-${index}`}
								type='text'
								placeholder="task's name"
								onChange={(event) =>
									handleTask("taskName", event.target.value, index)
								}
								value={tasks[index].taskName}
							/>
							<textarea
								name={`description-${index}`}
								placeholder="task's description"
								onChange={(event) =>
									handleTask("description", event.target.value, index)
								}
								value={tasks[index].description}
							/>
						</div>
					))}
					<p>{validationError}</p>
					<button onClick={handleClick} className='orange-btn'>
						Finish
					</button>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default TasksInfo;
