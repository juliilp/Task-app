import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegistro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const findEmail = await prisma.user.findFirst({
      where: { email: email },
    });
    if (findEmail)
      return res.status(400).json({ message: "El email ya éxiste" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "La contraseña deberia ser mayor a 6" });
    if (password.length >= 10)
      return res.json({
        message: "La contraseña deberia ser menor o igual a 10",
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await prisma.user.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      id: createUser.id,
      nombre: createUser.nombre,
      email: createUser.email,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await prisma.user.findFirst({
      where: { email },
    });
    if (!findUser)
      return res.status(404).json({ message: "Usuario no encontrado" });
    const passwordCompare = await bcrypt.compare(password, findUser.password);
    if (!passwordCompare)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    jwt.sign(
      { id: findUser.id },
      "secret123",
      { expiresIn: "1d" },
      (err, token) => {
        if (err) res.json({ err });
        res.cookie("token", token);
        console.log("Soy token " + token);
        res.json({ message: "usuario logeado" });
      }
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const userLogout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.json({ message: "Logout!" });
};

export const userProfile = async (req, res) => {
  const { id } = req.user;
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json({
    id: user.id,
    nombre: user.nombre,
    email: user.email,
  });
};

export const allUser = async (req, res) => {
  try {
    const allUser = await prisma.user.findMany();
    res.json(allUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const verifyToken = (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No hay token" });
  jwt.verify(token, "secret123", async (err, user) => {
    if (err) res.status(401).json({ message: "No autorizado" });
    const findUser = await prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!findUser) res.status(401).json({ message: "No autorizado" });
    return res.json({
      id: findUser.id,
      nombre: findUser.nombre,
      email: findUser.email,
    });
  });
};
