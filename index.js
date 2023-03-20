import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import { userRouter, reviewRouter } from "./src/routes/index.js";
import { swaggerUi, specs } from "./swagger.js";
// import api from './routes';

// 환경변수 사용
dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();
const dirname = path.resolve();
console.log(dirname, "dirname");

// 스웨거
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "NineLab API",
    version: "1.0.0",
    description: "NineLab API",
  },
  servers: [
    {
      url: "http://localhost:8001",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["src/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  }),
);

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
/**
 * @swagger
 * tags:
 *  name: Reviews
 *  description: 리뷰 추가 수정 삭제 조회 API
 *  name: Users
 *  description: 유저 추가 수정 삭제 조회 API
 */

app.use("/api", userRouter);
app.use("/api", reviewRouter);

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
