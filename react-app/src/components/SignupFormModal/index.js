import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";

function SignupFormModal({modalType}) {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				let newData = {};
				data.forEach(data => {
					let dataParts = data.split(' : ');
					newData[dataParts[0]] = dataParts[1];
				});
				setErrors(newData);
			} else {
				closeModal();
			}
		} else {
			setErrors({
				'password': "Passwords must match.",
				'confirmpassword': "Passwords must match.",
			});
		}
	};

	const appendModalTypetoClass = (str) => {
		return str + ' ' + modalType;
	}
	console.log(errors);

	return (
		<div className={appendModalTypetoClass('signup-form-modal')}>
			{modalType === 'signup-home' ? <p className='signup-heading'>Sign Up (It's Free!)</p> : <p className='signup-heading'>Sign Up</p>}
			{modalType === 'signup-home' && (
				<div className="signup-home-subheading">Already have an account?
					<OpenModalButton
					buttonText="Log In"
					modalComponent={<LoginFormModal />}
					buttonType="signup-home-option"
					/>
			</div>
			)}
			<form className='signup-form' onSubmit={handleSubmit}>
				<div className='signup-label-container'>
					<label for='signup-email-field'>Email</label>
					{errors.email && (
						<div className='signup-error'>{errors.email}</div>
						)}
				</div>
				<input
					className='signup-field'
					id='signup-email-field'
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					/>
				<div className='signup-label-container'>
					<label for='signup-username-field'>Username</label>
					{errors.username && (
						<div className='signup-error'>{errors.username}</div>
					)}
				</div>
				<input
					className='signup-field'
					id='signup-username-field'
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<div className='signup-label-container'>
					<label for='signup-password-field'>Password</label>
					{errors.password && (
					<div className='signup-error'>{errors.password}</div>
					)}
				</div>
				<input
					className='signup-field'
					id='signup-password-field'
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<div className='signup-label-container'>
					<label for='signup-confirm-password-field'>Confirm Password</label>
					{errors.confirmpassword && (
					<div className='signup-error'>{errors.confirmpassword}</div>
					)}
				</div>
					<input
						className='signup-field'
						id='signup-confirm-password-field'
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					<div className='signup-bottom-row'>
						<div className='signup-bottom-button-row'>
							{modalType === 'signup-nav' && (
								<div>Already have an account?
									<OpenModalButton
									buttonText="Log In"
									modalComponent={<LoginFormModal />}
									buttonType="signup-modal-option"
									/>
								</div>
							)}
							<button className={appendModalTypetoClass('signup-submit')} type="submit">SIGN UP</button>
						</div>
						{modalType === 'signup-nav' && (
							<div className='signup-tips'>
								<div className='signup-tip-label'>Sign Up Tips:</div>
								<div className='signup-tip'>All fields are required.</div>
								<div className='signup-tip'>Must use a valid email.</div>
								<div className='signup-tip'>Username must be 4 characters or more.</div>
								<div className='signup-tip'>Password must be 6 characters or more.</div>
							</div>
						)}
					</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
