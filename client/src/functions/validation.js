// 이메일
export const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// 아이디
export const isValidUsername = (username) =>
    /^[a-zA-Z0-9_]{3,20}$/.test(username);

// 패스워드 (최소 8자, 특문 포함)
export const isValidPassword = (pw) =>
    /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(pw);