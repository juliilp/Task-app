import { Router } from "express";
import userRoutes from "./user.routes.js";
import tareasRoutes from "./tareas.routes.js";
const routes = Router();

routes.use("/user", userRoutes);
routes.use("/tareas", tareasRoutes);
export default routes;
