import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginModal.css";

function LoginModal() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        navigate("/map");
      } else {
        setError(data.msg || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("서버 연결에 실패했습니다.");
    }
  };

  const handleRegister = async () => {
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", formData.username);
        navigate("/map");
      } else {
        setError(data.msg || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("Register error:", error);
      setError("서버 연결에 실패했습니다.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>Login</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={e =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          {error && (
            <div className="error" style={{ display: "block" }}>
              {error}
            </div>
          )}
          <button type="submit">Login</button>
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
