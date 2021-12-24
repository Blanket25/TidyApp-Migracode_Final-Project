import { useState, useEffect } from 'react';
import Nav from '../pages/sharedComponents/Nav';
//import { Link } from "react-router-dom";
const groupId = 1;
function EditUsers() {
	const [users, setUsers] = useState([]);
	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
	});
	const [newUsers, setNewUsers] = useState([]);
	// const [newEmail, setNewEmail] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://localhost:4000/users/${groupId}`);
			const data = await response.json();
			console.log(data);
			setUsers(data);
		};
		fetchData();
	}, []);
	const handleChange = (event) => {
		const { value, name } = event.target;
		setNewUser((prevValues) => {
			if (name === 'email') {
				return {
					name: prevValues.name,
					email: value,
				};
			}
			if (name === 'name') {
				return {
					name: value,
					email: name,
				};
			}
		});
	};
	const handleClick = () => {
		setNewUsers((prevUsers) => {
			return [...prevUsers, newUser];
		});
	};
	return (
		<>
			<div>
				<Nav />
			</div>
			<div>
				<h3>Edit a user</h3>
				{users.map((user, index) => (
					<div>
						<div key={index}>
							<p>{user.username}</p>
							<input
								name={`username-${index}`}
								type='text'
								placeholder='username'
								value={newUsername[index]}
								onChange={handleChange}
							/>
							<input
								name={`email-${index}`}
								type='text'
								placeholder='email'
								value={newEmail[index]}
								onChange={handleChange}
							/>
							<button className='purple-btn' onClick={handleClick}>
								Edit
							</button>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
export default EditUsers;
