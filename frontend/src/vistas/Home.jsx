import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { motion, useInView } from "framer-motion";
export default function Home() {
  const { authenticacion, allTareas, getAllTareas, handlerDelete, user } =
    useAuth();
  useEffect(() => {
    getAllTareas();
  }, []);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="w-full h-screen flex mt-[7vh]"
    >
      {authenticacion ? (
        <div>
          {allTareas && allTareas.length > 0 && (
            <h1 className="text-3xl md:text-3xl my-8 pl-4 md:pl-8 lg:pl-12">
              Mis Tareas
            </h1>
          )}
          <div className="w-screen flex flex-col gap-4 justify-center items-center md:grid md:grid-cols-2 md:gap-2 lg:grid-cols-3 2xl:grid-cols-4 justify-self-center place-items-center ">
            {allTareas && allTareas.length > 0 ? (
              allTareas.map((tarea, key) => {
                return (
                  <motion.div
                    className="min-w-[320px] pl-2 py-2 min-h-[200px] bg-[#E34A6F] text-[#eed6ee] gap-6 flex flex-col relative border group font-Roboto rounded-[20px] "
                    key={key}
                  >
                    <h1 className="text-2xl">{tarea.titulo}</h1>
                    <span className="text-sm">{tarea.tarea}</span>
                    <div className="flex gap-2 absolute top-2 right-4">
                      <Link
                        to={`/${tarea.id}`}
                        className="hover:scale-110 hover:duration-200"
                      >
                        <BsEyeFill size={25} />
                      </Link>
                      <button
                        className="hover:scale-110 hover:duration-200"
                        onClick={() => handlerDelete(tarea.id)}
                      >
                        <VscChromeClose size={25} />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-center mt-[8vh] text-2xl">
                ¡No tenes tareas creadas!
              </p>
            )}
          </div>
        </div>
      ) : (
        <Link to="/creartarea">
          <p className="mt-[8vh] text-center w-full text-2xl hover:underline pl-4 ">
            ¡Crea tu primer tarea!
          </p>
        </Link>
      )}
    </motion.section>
  );
}
