import Nav from './Nav';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<header>
			<div className='header-nav-container'>
				<Nav />
			</div>
			<div>
				<Link className='purple-btn' to='/login'>
					Log in
				</Link>
				<Link className='orange-btn' to='/signup'>
					Get started
				</Link>
			</div>
		</header>
	);
}

export default Header;
