import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { HiMenu } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
export default function Navbar() {
  const { user, handlerLogout, authenticacion, activateMenu, setActivateMenu } =
    useAuth();
  const handlerMenu = () => {
    setActivateMenu((prev) => !prev);
  };
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="w-full h-[7vh] fixed top-0 left-0 backdrop-blur-md z-50 border "
    >
      <div className="w-full h-full flex justify-between items-center px-3 md:px-6">
        <Link to="/">
          <span className="font-semibold text-xl cursor-pointer ">
            Task-app
          </span>
        </Link>
        <HiMenu size={30} onClick={handlerMenu} className="md:hidden" />
        <ul className="hidden md:flex md:gap-3 ">
          <li>
            <Link to="/" className="hover:underline">
              Inicio
            </Link>
          </li>
          <li>
            {authenticacion && (
              <button onClick={handlerLogout} className="hover:underline">
                Cerrar sesion
              </button>
            )}
          </li>
          <li>
            {authenticacion ? (
              user && user.nombre
            ) : (
              <Link
                to="/login"
                onClick={handlerMenu}
                className="hover:underline "
              >
                Iniciar sesion
              </Link>
            )}
          </li>
          <li>
            {authenticacion ? (
              <Link
                to="/creartarea"
                onClick={handlerMenu}
                className="hover:underline"
              >
                Crear tarea
              </Link>
            ) : (
              <Link
                to="/registro"
                onClick={handlerMenu}
                className="hover:underline"
              >
                Registro
              </Link>
            )}
          </li>
        </ul>
      </div>
      <AnimatePresence>
        {activateMenu && (
          <motion.nav
            initial={{ opacity: 0, top: -100 }}
            animate={{ opacity: 1, top: 49 }}
            exit={{ opacity: 0, top: -100 }}
            transition={{ duration: 0.5 }}
            className=" bg-white  w-full h-[100px] flex flex-col justify-center items-center absolute md:hidden"
          >
            <Link to="/" onClick={handlerMenu} className="hover:underline">
              Inicio
            </Link>
            {authenticacion && (
              <button onClick={handlerLogout} className="hover:underline">
                Cerrar sesion
              </button>
            )}
            <span>
              {authenticacion ? (
                user && user.nombre
              ) : (
                <Link
                  to="/login"
                  onClick={handlerMenu}
                  className="font-Poppins hover:underline"
                >
                  Iniciar sesion
                </Link>
              )}
            </span>
            {authenticacion ? (
              <Link
                to="/creartarea"
                onClick={handlerMenu}
                className="hover:underline"
              >
                Crear tarea
              </Link>
            ) : (
              <Link
                to="/registro"
                onClick={handlerMenu}
                className="hover:underline"
              >
                Registro
              </Link>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
