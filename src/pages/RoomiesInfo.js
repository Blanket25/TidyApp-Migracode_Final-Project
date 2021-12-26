import React, { useState, useEffect } from "react";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";
import { useNavigate, useLocation } from "react-router-dom";

function RoomiesInfo() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [roomies, setRoomies] = useState([]);
	const [validationError, setValidationError] = useState("");
	const { number, newGroupData } = state;
	// need to receive group id and secret

	useEffect(() => {
		const emptyRoomie = new Array(parseInt(number - 1)).fill().map(() => ({
			username: "",
			email: "",
			type_of_user: `roomie`,
		}));

		setRoomies(emptyRoomie);
	}, [number]);
	const handleTask = (attribute, newValue, index) => {
		const newRoomies = [...roomies];
		const newRoomie = { ...roomies[index] };
		newRoomie[attribute] = newValue;
		newRoomies[index] = newRoomie;
		setRoomies(newRoomies);
	};
	const submitRoomies = async () => {
		let isValid = true;
		roomies.map(
			(roomie) =>
				(isValid = isValid && roomie.username !== "" && roomie.email !== "")
		);
		if (isValid) {
			navigate("/tasks-frequency", { state: { roomies, newGroupData } }); // pass roomies as a parametre, not as a prop
		} else {
			setValidationError("You're missing some information!");
		}
	};
	return (
		<div>
			<Nav />
			<div className='set-roomies-main-container'>
				<div>
					<h3>
						{number - 1 > 1
							? `Enter the info of your ${number - 1} roomies`
							: "Enter the info of your roomie"}{" "}
					</h3>
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
