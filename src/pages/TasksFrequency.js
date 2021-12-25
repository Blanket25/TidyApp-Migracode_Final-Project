import "../index.css";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function TasksFrequency() {
	const [frequency, setFrequency] = useState("weekly");
	// const [tasks, setTasks] = useState([]);
	// const [validationError, setValidationError] = useState("");
	const navigate = useNavigate();
	const { state } = useLocation();
	const { roomies, newGroupData } = state;
	const number = roomies.length + 1;

	const handleFrequency = (event) => {
		const value = event.target.value;
		setFrequency(value);
	};

	async function fetchGroup() {
		const response = await fetch("http://localhost:4000/groups", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: newGroupData.group,
				email: newGroupData.email,
				frequency: frequency,
				password: newGroupData.password,
				numbers_of_roomies: number,
			}),
		});
		if (!response.ok) throw Error(response.message);
		try {
			const data = await response.json();
			for (let property in data) {
				const receivedId = data[property];
				localStorage.setItem("groupId", receivedId);
			}
			return data;
		} catch (err) {
			throw err;
		}
	}
	const handleClick = async () => {
		fetchGroup();
		navigate("/tasks-info", { state: { roomies, newGroupData } });
	};

	return (
		<div>
			<Nav />
			<div className='tasks-card-container'>
				<div className='task-card u-box-shadow'>
					<p className='u-margin-bottom-small'>
						How often do you want the tasks to rotate between roomies?
					</p>
					<select name='frequency' value={frequency} onChange={handleFrequency}>
						<option value='weekly'>Weekly</option>
						<option value='biweekly'>Biweekly</option>
						<option value='monthly'>Monthly</option>
					</select>
				</div>
			</div>
			<div className='roomies-info-btn-container u-margin-top-small '>
				<button onClick={handleClick} className='orange-btn'>
					Next
				</button>
			</div>
			<Footer />
		</div>
	);
}

export default TasksFrequency;
