import jwt from "jsonwebtoken";

export const authrequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) res.status(401).json({ message: "Necesitas iniciar sesión" });
  jwt.verify(token, "secret123", (err, decoded) => {
    if (err) {
      res.json({ error: "Token inválido" });
      return;
    }
    req.user = decoded;
    next();
  });
};
