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
      let newData = {};
      data.forEach(data => {
        let dataParts = data.split(' : ');
        newData[dataParts[0]] = dataParts[1];
      });
      setErrors(newData);
    } else {
      closeModal();
    }
  };

  const DemoUserLogin = () => {
    let demoEmail = 'demo@aa.io';
    let demoPassword = 'password'

    dispatch(login(demoEmail, demoPassword)).then(closeModal);
  }

  return (
    <div className="login-form-modal">
      <p>Log In</p>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='login-label-container'>
          <label for='credential-field'>Email</label>
          {errors.email && (
              <div className='login-error'>{errors.email}</div>
          )}
        </div>
        <input
          id='credential-field'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className='login-label-container'>
          <label for='password-field'>Password</label>
          {errors.password && (
              <div className='login-error'>{errors.password}</div>
          )}
        </div>
        <input
          id='password-field'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='login-submit' type="submit">LOG IN</button>
        <div className='login-demo-div' onClick={DemoUserLogin}>Testing the site? Click here.</div>
      </form>
    </div>
  );
}

export default LoginFormModal;
