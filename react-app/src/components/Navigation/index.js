import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useHistory } from 'react-router';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import LearnMoreModal from '../LearnMoreModal';
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

	const comingSoon = () => {
		window.alert("Feature In Progress")
	}

	return (
	<div className="nav-bar-container">
		<div className='nav-bar'>
			<div className='nav-bar-left-section'>
				<div className='nav-bar-logo' onClick={goToHome}>
					{/* <i className="fa-solid fa-mug-hot"></i> */}
					<img src={logo}></img>
					<div>TeaHarmony</div>
				</div>
				<div className='nav-bar-left-option-container'>
					<div className='nav-bar-left-option' onClick={goToHome}>
						Home
					</div>
					<div className='nav-bar-left-option' onClick={goToTeaIndex}>
						Teas
					</div>
					{/* <div className='nav-bar-left-option' onClick={comingSoon}>
						Places
					</div>
					<div className='nav-bar-left-option' onClick={comingSoon}>
						Explore
					</div> */}
				</div>
			</div>
			<div className='nav-bar-right-section'>
				{isLoaded && sessionUser && (
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				)}
				{isLoaded && !sessionUser && (
					<div className='nav-bar-right-option-container'>
						<div>
							<OpenModalButton
								buttonText="Learn More"
								modalComponent={<LearnMoreModal />}
								buttonType="nav-bar-option"
							/>
						</div>
						<OpenModalButton
							buttonText="Log In"
							modalComponent={<LoginFormModal />}
							buttonType="nav-bar-option"
						/>
						<OpenModalButton
							buttonText="Sign Up"
							modalComponent={<SignupFormModal modalType={'signup-nav'}/>}
							buttonType="nav-bar-option"
						/>
					</div>
				)}
			</div>
		</div>
	</div>
	);
}

export default Navigation;
