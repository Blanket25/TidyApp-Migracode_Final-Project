import '../index.css';
import homepageMainImg from '../img/homepage-main-img.svg';
import Header from './sharedComponents/Header';
import Footer from './sharedComponents/Footer';

function Homepage() {
	return (
		<div className='App'>
			<Header />
			<main>
				<div className='homepage-main-container'>
					<div className='homepage-main-text u-center-text u-margin-top-medium'>
						<h1>Welcome to TidyApp!</h1>
						<p className='text-purple text-bold u-margin-top-small u-margin-bottom-small'>
							Keep your house clean and your roomies happy
						</p>
						<p className='text-bold'>
							An easy tool to keep your house clean and organised.
						</p>
					</div>
					<div className='homepage-main-image-container'>
						<img
							src={homepageMainImg}
							alt='people in a tidy room'
							className='homepage-main-image'
						/>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
export default Homepage;
