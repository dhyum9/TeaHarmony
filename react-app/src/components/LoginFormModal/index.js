import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <div className="login-form-modal">
      <p>Log In</p>
      <form className='login-form' onSubmit={handleSubmit}>
        <label for='credential-field'>
          Email
        </label>
        <input
          id='credential-field'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label for='password-field'>
          Password
        </label>
        <input
          id='password-field'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
          {errors.map((error, idx) => (
            <div className='login-error' key={idx}>{error}</div>
          ))}
        </div>
        <button className='login-submit' type="submit">LOG IN</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
