import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {SignupForm} from "./SignupForm.jsx";
import SafeInput from"../components/CommonComps/SafeInput.jsx"
import { isValidEmail, isValidUsername, isValidPassword } from "../functions/validation.js"; // Assuming you have a utility function for email validation

function LoginModal({ onClose, }) {


  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    passwordCheck: "",
    emailVerified: false,
  });
  const [error, setError] = useState("");
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const background = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if(!isValidUsername(formData.username)) {
      alert("올바른 사용자 이름 형식을 입력해주세요");
      return;
    }

    if(!formData.username || !formData.password){
      alert("올바른 값을 입력해주세요")
      return;

    }

    try {
      const response = await fetch(`${import.meta.env.VITE_TEST_API_BASE_URLSafeInput}/api/login`, {
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
        sessionStorage.setItem("username", data.user.username);
        sessionStorage.setItem("role", data.user.role);
        sessionStorage.setItem("permissions", JSON.stringify(data.user.permissions));



        if(data.user.role === "admin"){
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



  const backgroundClick = (e) =>{
    if(e.target.classList.contains("modal-overlay")){
      onClose(e.target);
    }
  }

  return (
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl flex h-5/6 bg-cover bg-center"
             style={{backgroundImage:"url('images/cover.jpeg')"}}>
          <div className="hidden md:flex flex-col justify-center items-center flex-1  bg-center text-white p-8  ">

            <h2 className="text-2xl font-light">Welcome to the space</h2>
            <h1 className="text-4xl font-bold mt-4 text-center">Welcome to the fragment</h1>
          </div>

        {/*  오른쪽 영역*/}
          <div className="flex-1 flex flex-col justify-center items-center p-8 relative backdrop-blur-xs backdrop-brightness-50">
            <div
                className="absolute top-4 right-4 text-black-400 hover:text-white cursor-pointer"
                onClick={onClose}
            >
              X
            </div>
            {!isSignupModalOpen ? (
                <>
                  <h2 className="text-2xl font-semibold text-white mb-6 ">Login</h2>
                  <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
                    <SafeInput
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="border border-gray-300 rounded-md p-3 w-full text-white"
                    />
                    <SafeInput
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="border border-gray-300 rounded-md p-3 w-full text-white"
                    />
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    <button
                        type="submit"
                        className="bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-md"
                    >
                      Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsSignupModalOpen(true)}
                        className="border border-cyan-500 text-gray-500 hover:bg-cyan-50 p-3 rounded-md"
                    >
                      Join us
                    </button>
                  </form>
                </>
            ) : (
                <SignupForm

                    formData={formData}
                    setFormData={setFormData}
                    setIsSignupModalOpen={setIsSignupModalOpen}
                />
            )}
        </div>
      </div>
      </div>

  )}


  export default LoginModal;