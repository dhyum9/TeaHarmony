import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.replace("/");
  };

  const goToTealog = () => {
    history.push(`/tealog`);
  };

  const goToTastingNotes = () => {
    history.push(`/tastingnotes`);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div>
      <button onClick={openMenu} className='profile-button'>
        <div className='profile-button-item'>You</div>
        {/* <i className="fas fa-user-circle profile-button-item" /> */}
        <i className="fa-solid fa-caret-down profile-button-item"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='profile-dropdown-options'>
            <div className='profile-dropdown-info'>
              <div className='profile-dropdown-option'>Email: {user.email}</div>
              <div className='profile-dropdown-option'>Username: {user.username}</div>
            </div>
            <div className='profile-dropdown-option manage-option' onClick={goToTealog}>Tealog</div>
            <div className='profile-dropdown-option manage-option' onClick={goToTastingNotes}>Tasting Notes</div>
            <button className='log-out-button' onClick={handleLogout}>Log Out</button>
          </div>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
