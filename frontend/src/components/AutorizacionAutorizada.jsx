import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
export default function AutorizacionAutorizada() {
  const navigate = useNavigate();
  const { authenticacion } = useAuth();
  useEffect(() => {
    if (!authenticacion) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}
