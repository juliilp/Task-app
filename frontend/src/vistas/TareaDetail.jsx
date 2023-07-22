import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function TareaDetail() {
  const navigate = useNavigate();
  const { getTareaDetail, idTareas, tareaDetail, handlerEdit } = useAuth();
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

  const handlerInput = (e) => {
    setActualizarTarea({
      ...actualizarTarea,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(actualizarTarea);
  };
  return (
    <section className="flex w-full h-screen justify-center items-center flex-col">
      {tareaDetail && (
        <>
          <p>{tareaDetail.titulo}</p>
          <p>{tareaDetail.tarea}</p>
        </>
      )}
      <h2>Editar Tarea</h2>
      <form
        className="w-[350px] h-[300px] border flex justify-center  flex-col"
        onSubmit={(evento) =>
          handlerEdit(evento, tareaDetail.id, actualizarTarea)
        }
      >
        <div className="flex flex-col">
          <span>Titulo</span>
          <input
            type="text"
            placeholder="titulo"
            className="border outline-none"
            onChange={handlerInput}
            name="titulo"
          />
        </div>
        <div className="flex flex-col">
          <span>Tarea</span>
          <input
            type="text"
            placeholder="tarea"
            className="border outline-none"
            onChange={handlerInput}
            name="tarea"
          />
        </div>
        <button type="form">Cambiar datos</button>
      </form>
    </section>
  );
}
