import "../index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ContentToPrint(props) {
	const [fetchedData, setFetchedData] = useState([]);
	useEffect(() => {
		const getData = async () => {
			const data = await axios.get(`http://localhost:4000/tasks/${props.id}`);

			setFetchedData(data);
		};
		getData();
		console.log("This is params id:" + props.id);
	}, [props.id]);
	const tasks = [
		// {
		// 	name: "Elmira",
		// 	task: "clean the kitchen",
		// },
		// {
		// 	name: "Omar",
		// 	task: "buy food",
		// },
		// {
		// 	name: "Bianca",
		// 	task: "clean the living room",
		// },
	];
	const handleChange = (index) => {
		console.log(`changed task ${index}`);
	};
	return (
		<div className='card-container'>
			<div className='card'>
				{fetchedData.data
					? fetchedData.data.forEach((item) => {
							tasks.push(item);
					  })
					: null}

				{tasks.map((item, index) => {
					return (
						<div className='task-container' key={index} id={index}>
							<p>{item.username}</p>
							<div>
								<p>{item.task_name}</p>
								<p>{item.description}</p>
							</div>
							<input type='checkbox' onChange={() => handleChange(index)} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ContentToPrint;
