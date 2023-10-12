import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
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

	console.log(errors);

	return (
		<div className="signup-form-modal">
			<p>Sign Up</p>
			<form className='signup-form' onSubmit={handleSubmit}>
				<div className='signup-label-container'>
					<label for='signup-email-field'>Email</label>
					{errors.email && (
						<div className='signup-error'>{errors.email}</div>
						)}
				</div>
				<input
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
						id='signup-confirm-password-field'
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					<div className='signup-bottom-row'>
						<ul className='signup-tips'>
							<li className='signup-tip'>All fields are required.</li>
							<li className='signup-tip'>Must use a valid email.</li>
							<li className='signup-tip'>Username must be 4 characters or more.</li>
							<li className='signup-tip'>Password must be 6 characters or more.</li>
						</ul>
						<button className='signup-submit' type="submit">SIGN UP</button>
					</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
