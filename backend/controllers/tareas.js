import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const traerTareas = async (req, res) => {
  const { id } = req.user;
  const allTareas = await prisma.tareas.findMany({
    where: {
      userId: id,
    },
  });
  res.json(allTareas);
};

export const crearTarea = async (req, res) => {
  const { titulo, tarea } = req.body;
  console.log(req.user.id);
  const crearTarea = await prisma.tareas.create({
    data: {
      titulo,
      tarea,
      userId: req.user.id,
    },
  });
  res.json({ crearTarea });
};

export const deleteTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTarea = await prisma.tareas.delete({
      where: { id: parseInt(id) },
    });
    res.json(deleteTarea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const tareaDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const tareaDetail = await prisma.tareas.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(tareaDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const tareaEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, tarea } = req.body;

    const tareaDetail = await prisma.tareas.findUnique({
      where: { id: parseInt(id) },
    });

    if (!tareaDetail)
      return res.status(404).json({ message: "tarea no encontrada" });

    const editTarea = await prisma.tareas.update({
      where: { id: parseInt(id) },
      data: { titulo, tarea },
    });

    res.json(editTarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
