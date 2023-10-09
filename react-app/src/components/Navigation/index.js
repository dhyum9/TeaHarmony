import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useHistory } from 'react-router';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import logo from './teaharmony-icon.png';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();

  const goToHome = () => {
    history.push(`/`);
  };

	const goToTeaIndex = () => {
    history.push(`/teas`);
  };

	return (
	<div className="nav-bar-container">
		<div className='nav-bar'>
			<div className='nav-bar-left-section'>
				<div className='nav-bar-logo' onClick={goToHome}>
					{/* <i className="fa-solid fa-mug-hot"></i> */}
					<img src={logo}></img>
					<div>TeaHarmony</div>
				</div>
				<div className='nav-bar-left-options'>
					<div onClick={goToHome}>
						Home
					</div>
					<div onClick={goToTeaIndex}>
						Teas
					</div>
					<div>
						Places
					</div>
					<div>
						Explore
					</div>
				</div>
			</div>
			<div className='nav-bar-right-section'>
				{isLoaded && sessionUser && (
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				)}
				{isLoaded && !sessionUser && (
					<>
						<div> Learn More </div>
						<div className = "nav-bar-right-options">
							<OpenModalButton
								buttonText="Log In"
								modalComponent={<LoginFormModal />}
							/>
						</div>
						<div className = "nav-bar-right-options">
							<OpenModalButton
								buttonText="Sign Up"
								modalComponent={<SignupFormModal />}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	</div>
	);
}

export default Navigation;
