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
const oauthRouter = require("./routes/oauth");
const helmet = require("helmet");


app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://trusted.cdn.com"],
    objectSrc: ["'none'"],
    styleSrc: ["'unsafe-inline'", "'self'"],
  },
}));
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.noSniff());
app.use(helmet.xssFilter());


const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 미들웨어

app.use(
    cors({
      origin: process.env.CLIENT_BASE_URL,
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
        secure: true,
        sameSite: "none",
        httpOnly: true,
        maxAge: 1000 * 60 * 60,     // 1시간
      },
    })
);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

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
app.use("/api/oauth", oauthRouter);



const PORT = process.env.PORT || 5050;
app.listen(PORT, '0.0.0.0', () =>
    console.log(`Server running on: (http://localhost:${PORT}`)
);

