import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useHistory } from 'react-router';
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
		<div className='nav-bar'>
			<div className='nav-bar-left-section'>
				<div className='nav-bar-logo' onClick={goToHome}>
					<i class="fa-solid fa-mug-hot"></i>
					<div>TeaHarmony</div>
				</div>
				<div onClick={goToHome}>
					Home
				</div>
				<div onClick={goToTeaIndex}>
					Teas
				</div>
			</div>
			<div className='nav-bar-right-section'>
				{isLoaded && (
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Navigation;
