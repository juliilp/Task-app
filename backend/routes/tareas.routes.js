import { Router } from "express";
import {
  traerTareas,
  crearTarea,
  deleteTarea,
  tareaDetail,
  tareaEdit,
} from "../controllers/tareas.js";
import { authrequired } from "../middleware/authrequired.js";
const routes = Router();

routes.get("/", authrequired, traerTareas);
routes.post("/creartarea", authrequired, crearTarea);
routes.delete("/:id", authrequired, deleteTarea);
routes.get("/:id", authrequired, tareaDetail);
routes.put("/:id", authrequired, tareaEdit);
export default routes;
