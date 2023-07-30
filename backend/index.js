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
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("server funcionando");
  console.log(process.env.PORT);
});
