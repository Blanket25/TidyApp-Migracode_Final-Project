import "../index.css";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Team_building_Outline from "../img/Team_building_Outline.svg";

function NoOfRommies() {
	const [number, setNumber] = useState(0);
	const navigate = useNavigate();
	const { state } = useLocation();
	const { newGroupData } = state;

	const handleSubmit = (e) => {
		e.preventDefault();
		//console.log(number);
		navigate("/set_roomies", { state: { number, newGroupData } });
	};

	return (
		<div className='roomies-main'>
			<Nav />
			<div className='roomies-container'>
				<div className='task-card roomies-card'>
					<h3>How many people live in your house (including you)?</h3>

					<form onSubmit={handleSubmit}>
						<input
							type='number'
							value={number}
							onChange={(e) => {
								console.log(newGroupData);
								setNumber(e.target.value);
							}}
						/>
						<button className='orange-btn'>Submit</button>
					</form>
				</div>
				<img
					className='u-margin-top-medium u-margin-bottom-big'
					src={Team_building_Outline}
					alt='peoplesolving a puzzle'
				/>
			</div>
			<Footer />
		</div>
	);
}

export default NoOfRommies;
