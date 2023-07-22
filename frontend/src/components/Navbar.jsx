import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Cookies from "js-cookie";
export default function Navbar() {
  const [cookie, setCookie] = useState();
  // useEffect(() => {
  //   const cookies = Cookies.get();
  //   if (cookies.token) {
  //     setCookie(cookies);
  //   }
  // }, []);
  const { user, handlerLogout, authenticacion } = useAuth();

  return (
    <header className="w-full h-[10vh] border px-6">
      <ul className={`flex  w-full ${authenticacion && "justify-around"}`}>
        <Link to="/">
          <li>Inicio</li>
        </Link>
        {authenticacion ? (
          <>
            <h2>{user && user.nombre}</h2>
            <button onClick={handlerLogout}>Cerrar Sesión</button>
            <Link to="/creartarea">Crear Tarea</Link>
          </>
        ) : (
          <div className="flex gap-3">
            <Link to="/login">
              <li>Iniciar sesion</li>
            </Link>
            <Link to="/registro">
              <li>Registrarse</li>
            </Link>
          </div>
        )}
      </ul>
    </header>
  );
}
