import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
export default function Registro() {
  const { handlerRegistro, user, authenticacion, registerError } = useAuth();
  const [userRegistro, setUserRegistro] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setUserRegistro({
      ...userRegistro,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className="w-full h-screen flex justify-center items-center flex-col">
      <h1 className="text-4xl font-semibold">¡Registrate!</h1>
      <span className="text-gray-400 text-sm">
        Ya estas registrado?{"  "}
        <Link
          to="/login"
          className="focus:underline hover:underline cursor-pointer"
        >
          Inicia sesion
        </Link>
      </span>
      <form
        className="w-[90%] max-w-[650px] border flex flex-col gap-6 py-8 font-Roboto pl-4"
        onSubmit={(event) => handlerRegistro(event, userRegistro)}
      >
        <div className="flex gap-2 flex-col">
          {registerError && (
            <p className="text-white bg-red-500 w-max p-2 px-6 rounded-sm font-medium">
              {registerError.message}
            </p>
          )}
          <span>Nombre</span>
          <input
            type="text"
            placeholder="name"
            name="nombre"
            className="bg-[#F8FAFA] py-2 outline-none placeholder:pl-2"
            onChange={inputHandler}
          />
        </div>
        <div className="flex gap-2 flex-col">
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="user@gmail.com"
            className="bg-[#F8FAFA] py-2 outline-none placeholder:pl-2 "
            onChange={inputHandler}
          />
        </div>
        <div className="flex gap-2 flex-col">
          <span>Contraseña</span>
          <input
            type="password"
            placeholder="**********"
            name="password"
            className="bg-[#F8FAFA] py-2 outline-none  placeholder:pl-2 "
            onChange={inputHandler}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm w-max  px-5 py-2.5 text-center "
        >
          Registrarse!
        </button>
      </form>
    </section>
  );
}
