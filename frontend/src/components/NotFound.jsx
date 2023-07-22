import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}
