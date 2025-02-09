const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // React 앱의 주소
    credentials: true,
  })
);

// 라우트
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
