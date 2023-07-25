import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { HiMenu } from "react-icons/hi";
export default function Navbar() {
  const { user, handlerLogout, authenticacion, activateMenu, setActivateMenu } =
    useAuth();
  const handlerMenu = () => {
    setActivateMenu((prev) => !prev);
  };
  return (
    <header className="w-full h-[7vh] fixed top-0 left-0 backdrop-blur-md z-50 border ">
      <div className="w-full h-full flex justify-between items-center px-2">
        <span className="font-semibold text-xl">Task-app</span>
        <HiMenu size={30} onClick={handlerMenu} className="md:hidden" />
        <ul className="hidden md:flex md:gap-3 ">
          <li>
            {authenticacion && (
              <button onClick={handlerLogout}>Cerrar sesion</button>
            )}
          </li>
          <li>
            {authenticacion ? (
              user && user.nombre
            ) : (
              <Link to="/login" onClick={handlerMenu}>
                Iniciar sesion
              </Link>
            )}
          </li>
          <li>
            {authenticacion ? (
              <Link to="/creartarea" onClick={handlerMenu}>
                Crear tarea
              </Link>
            ) : (
              <Link to="/registro" onClick={handlerMenu}>
                Registro
              </Link>
            )}
          </li>
        </ul>
      </div>
      {activateMenu && (
        <>
          <nav className=" my-3 w-full h-full z-[999] flex flex-col justify-center items-center absolute md:hidden">
            <Link to="/" onClick={handlerMenu}>
              Inicio
            </Link>
            {authenticacion && (
              <button onClick={handlerLogout}>Cerrar sesion</button>
            )}
            <span>
              {authenticacion ? (
                user && user.nombre
              ) : (
                <Link to="/login" onClick={handlerMenu}>
                  Iniciar sesion
                </Link>
              )}
            </span>
            {authenticacion ? (
              <Link to="/creartarea" onClick={handlerMenu}>
                Crear tarea
              </Link>
            ) : (
              <Link to="/registro" onClick={handlerMenu}>
                Registro
              </Link>
            )}
          </nav>
        </>
      )}
    </header>
  );
}
