import logo from '../img/Logo.png';
import { Link } from 'react-router-dom';

import AdminPanelButton from '../pages/sharedComponents/AdminPanelButton';
// import AdminPanelButton from '../sharedComponents/AdminPanelButton';
import Footer from '../pages/sharedComponents/Footer';
const AdminPanel = () => {
	return (
		<>
			<div className='admin-panel-logo-container'>
				<img src={logo} alt='TidyApp' className='app-logo'></img>
			</div>
			<div className='admin-panel-container'>
				<div className='admin-panel-left  u-center-text'>
					<h3 className='admin-panel-header'>Settings</h3>
					<div className='admin-panel-buttons u-margin-top-small u-margin-bottom-small '>
						<AdminPanelButton buttonText='Edit a task' />
						<AdminPanelButton buttonText='Edit a roomie' />
						<AdminPanelButton buttonText='Edit frequency' />
					</div>
				</div>
				<div className='admin-panel-settings-box'></div>
			</div>
			<div className='u-center-text admin-panel-board-redirection '>
				<p>Go to the task board</p>
				<Link to='/board'>
					<button className='purple-btn'> Board</button>
				</Link>
			</div>
			<Footer />
		</>
	);
};
export default AdminPanel;
