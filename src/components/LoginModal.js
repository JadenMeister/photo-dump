import React from "react";
import "../styles/LoginModal.css";

const LoginModal = () => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="btn facebook">Log in with Facebook</button>
        <button className="btn google">Log in with Google</button>
        <button className="btn apple">Log in with Apple</button>
      </div>
    </div>
  );
};

export default LoginModal;
