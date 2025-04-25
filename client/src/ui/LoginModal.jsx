import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginModal.css";

function LoginModal({ onClose }) {


  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const background = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if(!formData.username || !formData.password){
      alert("올바른 값을 입력해주세요")

    }

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
        console.log("로그인 응답", data);

      if (response.ok) {
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("role", data.role);

        console.log("로그인 성공", data.role);

        if(data.role === "admin"){
          navigate("/admin");
        } else{
            navigate("/map");
        }

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
    if(!formData.username || !formData.password){
      alert("올바른 값을 입력해주세요")
    }
    try {
      const response = await fetch("http://localhost:8080/api/register", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem("username", formData.username);
        alert("가입돠었습니다.")
        setFormData({ username:"", password: ""});
        navigate("/")


      }
      else {
        setError(data.msg || "회원가입에 실패했습니다.");
      }

    } catch (error) {
      console.error("Register error:", error);
      setError("서버 연결에 실패했습니다.");
    }
  };

  const backgroundClick = (e) =>{
    if(e.target.classList.contains("modal-overlay")){
      onClose(e.target);
    }
  }

  return (
      <div className="modal-overlay" onClick={backgroundClick}>
        <div className="close" onClick={onClose}>x</div>
        <div className="modal">
          <p>Login</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
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
                  onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                  }
              />
            </div>
            {error && (
                <div className="error" style={{ display: "block" }}>
                  {error}
                </div>
            )}
            <button type="submit" onClick={handleSubmit}>Login</button>
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          </form>
        </div>
      </div>
  );
}

export default LoginModal;