import express from "express";
import morgan from "morgan";
import cors from "cors";
import rutas from "./routes/routes.js";
import cookieParser from "cookie-parser";
const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
server.use(cookieParser());
server.use("/", rutas);

server.listen(3000, () => {
  console.log("server funcionando");
});
