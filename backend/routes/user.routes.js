import { Router } from "express";
import {
  userRegistro,
  userLogin,
  userLogout,
  userProfile,
  allUser,
  verifyToken,
} from "../controllers/user.js";
import { authrequired } from "../middleware/authrequired.js";
const routes = Router();
routes.get("/token", verifyToken);
routes.get("/alluser", allUser);
routes.post("/registro", userRegistro);
routes.post("/login", userLogin);
routes.post("/logout", userLogout);
routes.get("/profile", authrequired, userProfile);
export default routes;
