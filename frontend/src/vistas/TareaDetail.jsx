import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function TareaDetail() {
  const navigate = useNavigate();
  const {
    getTareaDetail,
    idTareas,
    tareaDetail,
    handlerEdit,
    editError,
    setEditError,
  } = useAuth();
  const [actualizarTarea, setActualizarTarea] = useState({
    tarea: "",
    titulo: "",
  });
  const { id } = useParams();

  useEffect(() => {
    if (!idTareas.includes(parseInt(id))) {
      navigate("/");
    }
  }, [id, idTareas, navigate]);

  useEffect(() => {
    getTareaDetail(id);
  }, [id]);
  useEffect(() => {
    setEditError("");
  }, []);
  const handlerInput = (e) => {
    setActualizarTarea({
      ...actualizarTarea,
      [e.target.name]: e.target.value,
    });
  };

  console.log(editError);
  return (
    <section className="flex w-full h-screen justify-center items-center flex-col">
      <h1 className="text-3xl font-semibold">Editar Tarea</h1>
      <form
        className="w-[90%] max-w-[650px] border flex flex-col gap-6 py-8 font-Roboto pl-4"
        onSubmit={(evento) =>
          handlerEdit(evento, tareaDetail.id, actualizarTarea)
        }
      >
        <div className="flex flex-col">
          {editError.length > 0 && (
            <span className="text-white bg-red-500 w-max p-2 px-6 rounded-sm font-medium mb-4">
              {editError}
            </span>
          )}
          <span>Titulo</span>
          <input
            type="text"
            placeholder="titulo"
            className="bg-[#F8FAFA] py-2 outline-none placeholder:pl-2"
            onChange={handlerInput}
            name="titulo"
          />
        </div>
        <div className="flex flex-col">
          <span>Tarea</span>
          <input
            type="text"
            placeholder="tarea"
            className="bg-[#F8FAFA] py-2 outline-none placeholder:pl-2"
            onChange={handlerInput}
            name="tarea"
          />
        </div>
        <button
          type="form"
          className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm w-max  px-5 py-2.5 text-center"
        >
          Cambiar datos
        </button>
      </form>
    </section>
  );
}
