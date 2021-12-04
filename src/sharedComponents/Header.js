import logo from '../img/Logo.png';

function Header() {
	return (
		<header>
			<img src={logo} alt='TidyApp' className='app-logo'></img>
			<div>
				<button className='purple-btn'>Log in</button>
				<button className='orange-btn'>Get started</button>
			</div>
		</header>
	);
}

export default Header;
