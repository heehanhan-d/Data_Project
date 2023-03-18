import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import { userRouter, reviewRouter } from "./src/routes";
// import api from './routes';
// import { swaggerUi, specs } from './swagger/swagger';

// 환경변수 사용
dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();
const dirname = path.resolve();
console.log(dirname, "dirname");


// CORS 에러 방지
app.use(cors());

// logger (morgan)
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname, "public")));

// app.use("/api", api);

app.get("/", (req, res) => {
  const title = "9Team Server";
  res.status(201).json(title);
});

// 라우터 연결
app.use("/api", userRouter);
app.use("/api", reviewRouter);

// // 스웨거
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


// DB 만들고 연결할 주소
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

// error handler

app.listen(port, () => {
  console.log(`${port}번 포트에서 대기중 🚀`);
});

export default app;

