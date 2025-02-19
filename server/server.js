const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 미들웨어

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200
  })
);

app.use(express.json());

// 라우트
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
