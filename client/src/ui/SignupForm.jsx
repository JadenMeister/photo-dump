import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";


import { useAuth } from "../context/AuthContext.jsx";


export function SignupForm({ formData, setFormData, setIsSignupModalOpen }) {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [passwordCheck, setPasswordCheck] = useState("");

    const passwordCheckHandler = (e) => {
        setPasswordCheck(e.target.value);
        if (e.target.value !== formData.password) {
            setError("비밀번호가 일치하지 않습니다.");
        } else {
            setError("");
        }
    }

    const handleRegister = async () => {
        setError("");
        if(!formData.username || !formData.password){
            alert("올바른 값을 입력해주세요")
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
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
                alert("가입되었습니다.")
                setFormData({ username:"", password: "", email:""});



            }
            else {
                setError(data.msg || "회원가입에 실패했습니다.");
            }

        } catch (error) {
            console.error("Register error:", error);
            setError("서버 연결에 실패했습니다.");
        }
    };

    return(
        <div className="w-full max-w-sm backdrop-blur-xs backdrop-brightness-90 p-6 rounded-xl flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center text-white">Join to your space!</h2>

            <input type="text" placeholder="your username" value={(formData.username)}
                   onChange={(e) => setFormData({...formData, username: e.target.value})}
                   className="border border-gray-300 text-white rounded-md p-2"/>

            <input type="text" placeholder="your email" value={(formData.email)}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   className="border border-gray-300 text-white rounded-md p-2"/>

            <input type="password" placeholder="your password" value={(formData.password)}
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                   className="border border-gray-300 text-white rounded-md p-2"/>

            <input type="password" placeholder="password Check" value={(formData.passwordCheck)}
                   onChange={(e) => setFormData({...formData, passwordCheck: e.target.value})}
                   className="border border-gray-300 text-white rounded-md p-2"/>

            {error && (
                <div className="text-red-400 none mt-1 text-1" style={{display: "block"}}>
                    {error}
                </div>
            )}

            <button
                onClick={handleRegister}
                className="btn w-full bg-blue-300 hover:bg-blue-500 text-white"
            >
                Sign up
            </button>

            <p className="text-xs text-green-200 text-center">Already have an account?</p>
            <button type="button" className="underline text-white hover:cursor-pointer" onClick={()=> setIsSignupModalOpen(false)}>
               Back to Login
            </button>
        </div>

    )
}