import jwt from "jsonwebtoken";

export const authrequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Necesitas iniciar sesión" });
  }
  jwt.verify(token, "secret123", (err, decoded) => {
    if (err) {
      return res.json({ error: "Token inválido" });
    }
    req.user = decoded;
    next();
  });
};
