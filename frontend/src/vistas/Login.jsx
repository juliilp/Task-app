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
    <section className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={(event) => handlerLogin(event, userSesion)}
        className="w-[90%] max-w-[600px] flex flex-col gap-6 pl-4 font-Roboto border py-8"
      >
        <div className="flex gap-4  flex-col">
          <p>{loginError && loginError.message}</p>
          <span>Email</span>
          <input
            type="email"
            onChange={inputHandler}
            className="border  w-max"
            name="email"
          />
        </div>
        <div className="flex gap-4 flex-col ">
          <span>Contraseña</span>
          <input
            type="password"
            onChange={inputHandler}
            className="border  w-max"
            name="password"
          />
        </div>
        <button type="submit" className="w-max">
          Iniciar sesion
        </button>
      </form>
    </section>
  );
}
