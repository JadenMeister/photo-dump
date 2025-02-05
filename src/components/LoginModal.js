import React from "react";
import "../styles/LoginModal.css";

const LoginModal = () => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="input-group">
          <p>Brighten up your fragement</p>
          <label htmlFor="userId">username</label>
          <input
            type="text"
            maxLength="12"
            id="userId"
            name="userId"
            placeholder="user name"
          />
          <span className="error" id="userIdError">
            Can't use symbol with ID
          </span>
        </div>
        <div className="input-group">
          <label htmlFor="userEmail">Email</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            placeholder="Email address"
          />
          <span className="error" id="emailError">
            Please put in correct email address
          </span>
        </div>
        <div className="input-group">
          <label htmlFor="userPw">password</label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            placeholder="Password"
          />
          <span className="error" id="passwordError">
            Password is invalid
          </span>
        </div>
        <div id="button" className="button">
          <button type="submit">LOGIN</button>
        </div>

        <button className="btn google">Log in with Google</button>
        <button className="btn apple">Log in with Apple</button>
      </div>
    </div>
  );
};

export default LoginModal;
