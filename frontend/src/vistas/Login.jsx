import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
export default function Login() {
  const { handlerLogin, loginError } = useAuth();
  const [userSesion, setUserSesion] = useState({
    email: "",
    password: "",
  });
  const inputHandler = (e) => {
    setUserSesion({
      ...userSesion,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(loginError);
  return (
    <section className="w-full h-screen flex justify-center items-center flex-col ">
      <h1 className="text-4xl font-semibold my-4 ">Inicia sesion</h1>
      <form
        onSubmit={(event) => handlerLogin(event, userSesion)}
        className="w-[90%] max-w-[600px] flex flex-col gap-6 pl-4 font-Roboto border py-8"
      >
        <div className="flex gap-4  flex-col">
          {loginError && (
            <p className="text-white bg-red-500 w-max p-2 px-6 rounded-sm font-medium">
              {loginError.message}
            </p>
          )}
          <span>Email</span>
          <input
            type="email"
            onChange={inputHandler}
            className="border-none  py-2 bg-[#F8FAFA]   outline-none placeholder:pl-2 "
            name="email"
            placeholder="prueba@gmail.com"
          />
        </div>
        <div className="flex gap-4 flex-col ">
          <span>Contraseña</span>
          <input
            type="password"
            onChange={inputHandler}
            className="border-none  py-2 bg-[#F8FAFA]  outline-none placeholder:pl-2 "
            name="password"
            placeholder="***********"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm w-max  px-5 py-2.5 text-center "
        >
          Iniciar sesion
        </button>
      </form>
    </section>
  );
}
