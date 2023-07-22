import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";
export default function Autorizacion() {
  const navigation = useNavigate();
  const { authenticacion } = useAuth();

  useEffect(() => {
    if (authenticacion) {
      navigation("/");
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}
