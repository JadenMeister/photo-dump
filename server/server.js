const express = require("express");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const pool = require("./config/database");
const MySQLStore = require("express-mysql-session")(session);

const app = express();
app.set("trust proxy", 1);
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const logoutRouter = require("./routes/logout");
const sessionRouter = require("./routes/session");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const uploadRouter = require("./routes/upload");
const authCheckRouter = require("./routes/authCheck");



const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 미들웨어

app.use(
  cors({
    origin:process.env.CLIENT_BASE_URL,
    credentials: true,
    optionsSuccessStatus: 200
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Strict절대 타 사이트에서는 쿠키 안 보냄 (로그인 유지 안 됨) Lax기본값. GET 요청 등 안전한 요청에는 쿠키 허용None완전 허용. 모든 cross-site 요청에 쿠키 보냄 (이 경우 secure: true 필수)

httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7일 동안 쿠키 유지
    }
  })
);

// JSON 파싱 미들웨어
app.use((req,res, next) => {
    req.db = pool;
    next();
});




// 라우트
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/session", sessionRouter);
app.use("/api/admin",adminRouter );
app.use("/api/upload", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/authCheck", authCheckRouter);



const PORT = process.env.PORT || 5050;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Server running on ${process.env.API_BASE_URL || `http://localhost:${PORT}`}`)
);
console.log("CLIENT_BASE_URL:", process.env.CLIENT_BASE_URL);
console.log("✅ NODE_ENV:", process.env.NODE_ENV);
console.log("✅ SESSION_SECRET:", process.env.SESSION_SECRET ? "OK" : " MISSING");
