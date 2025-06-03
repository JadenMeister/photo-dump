const express = require("express");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const pool = require("./config/database");

const app = express();
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const logoutRouter = require("./routes/logout");
const sessionRouter = require("./routes/session");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const uploadRouter = require("./routes/upload");
const authCheckRouter = require("./routes/authCheck");



app.use(express.urlencoded({ extended: true }));

// 미들웨어

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 // 1시간
    }
  })
);

// JSON 파싱 미들웨어
app.use((req,res, next) => {
    req.db = pool;
    next();
});


app.use(express.json());

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
app.listen(PORT, () =>
  console.log(`Server running on ${process.env.API_BASE_URL || `http://localhost:${PORT}`}`)
);
