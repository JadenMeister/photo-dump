const express = require("express");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");

const app = express();
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const logoutRouter = require("./routes/logout");
const sessionRouter = require("./routes/session");

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

app.use(express.json());

// 라우트
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/session", sessionRouter);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
