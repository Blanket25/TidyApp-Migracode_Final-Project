import '../index.css';
import Footer from './sharedComponents/Footer';
import Nav from './sharedComponents/Nav';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
	const [isSigned, setIsSigned] = useState(false);
	const [signupText, setSignupText] = useState('');
	const arrayOfRegisteredUsers = [];
	const [newUserData, setNewUserData] = useState({
		group: '',
		email: '',
		password: '',
		secret: '',
	});
	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setNewUserData((prevValue) => {
			if (name === 'group') {
				return {
					group: value,
					email: prevValue.email,
					password: prevValue.password,
					secret: prevValue.secret,
				};
			}
			if (name === 'email') {
				return {
					group: prevValue.group,
					email: value,
					password: prevValue.password,
					secret: prevValue.secret,
				};
			}
			if (name === 'password') {
				return {
					group: prevValue.group,
					email: prevValue.email,
					password: value,
					secret: prevValue.secret,
				};
			}
			if (name === 'groupSecret') {
				return {
					group: prevValue.group,
					email: prevValue.email,
					password: prevValue.password,
					secret: value,
				};
			}
		});
	};

	function handleClick(event) {
		event.preventDefault();
		const group = newUserData.group.length > 0;
		const email =
			newUserData.email.length > 0 && newUserData.email.includes('@');
		const password = newUserData.password.length >= 6;
		const secret = newUserData.secret.length > 0;

		if (group && email && password && secret) {
			setIsSigned(true);
			arrayOfRegisteredUsers.push(newUserData);
			setSignupText(
				'Your group was successfully created, you can now open the board'
			);
			navigate('/number-of-roomies');
		} else if (!group && email && password && secret) {
			setSignupText('Please enter the group name');
		} else if (group && !email && password && secret) {
			setSignupText('Please enter your email');
		} else if (group && email && password && !secret) {
			setSignupText(
				'Please choose a secret word for your group which will be used as a group password'
			);
		} else if (group && email && !password && secret) {
			setSignupText(
				'Please create a strong password (at least 6 characters long)'
			);
		} else if (!group && !email && password && secret) {
			setSignupText('Please enter the group name and email');
		} else if (group && !email && !password && secret) {
			setSignupText('Please enter your email and password');
		} else if (!group && email && !password && secret) {
			setSignupText(
				'Please enter a group name and create a strong password (at least 6 characters long)'
			);
		} else if (!group && email && password && !secret) {
			setSignupText(
				'Please enter a group name and create a secret word for your group which will be used as a group password'
			);
		} else if (group && !email && password && !secret) {
			setSignupText(
				'Please enter your email and create a secret word for your group which will be used as a group password'
			);
		} else if (group && email && !password && !secret) {
			setSignupText(
				'Please create a strong password (at least 6 characters long) and create a secret word for your group which will be used as a group password'
			);
		} else if (!group && !email && !password && !secret) {
			setSignupText(
				'Please fill all the fields. Note,that your password should be at least 6 characters long)'
			);
		}
	}

	return (
		<div className='signup-main-container'>
			<Nav />
			<div className='signup-form-container'>
				<h2>Get Started!</h2>
				<p>create your first group</p>
				<form>
					<input
						type='text'
						placeholder='group name'
						name='group'
						onChange={handleChange}></input>
					<input
						type='password'
						placeholder='group secret (group password)'
						name='groupSecret'
						onChange={handleChange}></input>
					<input
						type='text'
						placeholder='your email'
						name='email'
						onChange={handleChange}></input>
					<input
						type='password'
						placeholder=' your password'
						name='password'
						onChange={handleChange}></input>

					<button
						className='orange-btn'
						onClick={handleClick}
						disabled={isSigned ? true : false}>
						Create Group
					</button>
					<p>{signupText}</p>
					{/* <Link to="/board">
            <button className="orange-btn" disabled={isSigned ? false : true}>
              Go to board
            </button>
          </Link> */}
				</form>
				<p>I already have a group</p>
				<Link className='purple-btn' to='/login'>
					Log in
				</Link>
			</div>

			<Footer />
		</div>
	);
}

export default Signup;
