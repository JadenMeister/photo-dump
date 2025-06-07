import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { sendVerificationEmail, verifyEmailCode } from "../api/fetchDataApi.js";


import { useAuth } from "../context/AuthContext.jsx";


export function SignupForm({ formData, setFormData, setIsSignupModalOpen }) {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [verificationSent, setVerificationSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);

    const [timer, setTimer] = useState(0);
    const [cooldown, setCooldown] = useState(false);


  useEffect(() => {
    if (!cooldown) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [cooldown]);


    const passwordCheckHandler = (e) => {
      const value = e.target.value;
        setFormData({...formData, passwordCheck: value});
        if (e.target.value !== formData.password) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        } else {
            setError("");
        }
    }

//인증코드 전송
  const handleSendVerification = async () => {
    const result = await sendVerificationEmail(formData.email);
    if (result.msg === "인증 코드가 이메일로 전송되었습니다.") {
      alert(result.msg);
      setCooldown(true);
      setTimer(300); // 5분 타이머 설정
      setVerificationSent(true);
    } else {
      alert(result.msg || "전송 실패");
    }
  };

// 인증코드 확인
  const handleVerifyCode = async () => {
    const result = await verifyEmailCode(formData.email, verificationCode);
    if (result.msg === "이메일 인증 성공") {
      setEmailVerified(true);
      alert(result.msg);
    } else {
      alert(result.msg || "인증 실패");
    }
  };

    const handleRegister = async () => {
        setError("");
        if(!formData.username || !formData.password || !formData.email || !formData.passwordCheck){
            alert("올바른 값을 입력해주세요")
            return;
        }

        if(!emailVerified){
            alert("이메일 인증을 완료해주세요.");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_TEST_API_BASE_URL}/api/register`, {
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

            <div className="flex items-center justify-between w-full">
            <input type="text" placeholder="your email" value={(formData.email)}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   className="border border-gray-300 text-white rounded-md p-2 w-3/4"
                   disabled={emailVerified}

            />
              <button
                  type="button"
                  onClick={handleSendVerification} className={`border p-1 rounded-lg ${cooldown ? 'text-gray-400 cursor-not-allowed' : 'text-red-300 hover:text-red-200'}`} disabled={cooldown}>
                {cooldown ? `재전송 (${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60})` : "인증코드 전송"}
                  </button>
            </div>

          {verificationSent && (
              <div className="flex items-center gap-2 mt-2">
                <input
                    type="text"
                    placeholder="인증 코드 입력"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="border border-gray-300 text-white rounded-md p-2 w-full"
                />
                <button
                    type="button"
                    onClick={handleVerifyCode}
                    className="border p-1 rounded-lg text-green-300 hover:text-green-200"
                >
                  확인
                </button>
              </div>
          )}


            <input type="password" placeholder="your password" value={(formData.password)}
                   onChange={passwordCheckHandler}
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