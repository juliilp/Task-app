import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./vistas/Home.jsx";
import CrearTareas from "./vistas/CrearTareas.jsx";
import Registro from "./vistas/Registro";
import Login from "./vistas/Login";
import AuthProvider from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Autorizacion from "./components/Autorizacion";
import NotFound from "./components/NotFound";
import AutorizacionAutorizada from "./components/AutorizacionAutorizada";
import TareaDetail from "./vistas/TareaDetail";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Si estoy logeado, quiero que me mande al home  */}
        <Route element={<Autorizacion />}>
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Si estoy logeado, quiero que me permita ir a estas rutas */}
        <Route element={<AutorizacionAutorizada />}>
          <Route path="/creartarea" element={<CrearTareas />} />
          <Route path="/:id" element={<TareaDetail />} />
        </Route>

        {/* Si la ruta no existe, quiero que me lleve al home */}
        <Route element={<NotFound />}>
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
