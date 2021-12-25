import React, { useState, useEffect } from "react";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import emailjs from "emailjs-com";

function RoomiesInfo() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [roomies, setRoomies] = useState([]);
	const [validationError, setValidationError] = useState("");
	const { number } = state;
	// need to receive group id and secret
	const groupId = 4;
	const groupSecret = "thisIsSecret";

	useEffect(() => {
		const emptyRoomie = new Array(parseInt(number)).fill().map(() => ({
			username: "",
			email: "",
			type_of_user: `roomie`,
			group_id: groupId,
			password: groupSecret,
		}));

		setRoomies(emptyRoomie);
	}, [number]);
	const handleTask = (attribute, newValue, index) => {
		const newRoomies = [...roomies];
		const newRoomie = { ...roomies[index] };
		newRoomie[attribute] = newValue;
		newRoomies[index] = newRoomie;
		console.log("New roomies", newRoomies);
		setRoomies(newRoomies);
	};
	const submitRoomies = async () => {
		let isValid = true;
		roomies.map(
			(roomie) =>
				(isValid = isValid && roomie.username !== "" && roomie.email !== "")
		);
		if (isValid) {
			roomies.forEach((roomie) => {
				emailjs
					.send(
						"service_kbjdvl4",
						"template_k7fxp8r",
						{
							to_name: roomie.username,
							link: `http://localhost:3000/board/${groupId}`,
							to_email: roomie.email,
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
			await fetch("http://localhost:4000/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					roomies,
				}),
			});
			navigate("/tasks-info", { state: { roomies } }); // pass roomies as a parametre, not as a prop
		} else {
			setValidationError("You're missing some information!");
		}
	};
	return (
		<div>
			<Nav />
			<div className='set-roomies-main-container'>
				<div>
					<h3>Enter the info of {number} people</h3>
				</div>
				{roomies.map((n, index) => (
					<div key={`input-${index}`}>
						<p className='text-bold'>Roomie {index + 1}</p>
						<div className='input-groups-container'>
							<div className='input-group'>
								<p>Name:</p>
								<input
									name={`name-${index}`}
									type='text'
									onChange={(event) =>
										handleTask("username", event.target.value, index)
									}
									value={roomies[index].username}
								/>
							</div>
							<div className='input-group'>
								<p>Email:</p>
								<input
									type='text'
									name={`email-${index}`}
									onChange={(event) =>
										handleTask("email", event.target.value, index)
									}
									value={roomies[index].email}
								/>
							</div>
						</div>
					</div>
				))}
				<p>{validationError}</p>
				<div className='roomies-info-btn-container u-margin-top-small '>
					<button className='orange-btn' onClick={submitRoomies}>
						Next
					</button>
				</div>
			</div>
			<Footer />
		</div>
	);
}
export default RoomiesInfo;
