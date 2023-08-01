import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default function AuthProvider({ children }) {
  const cookies = Cookies.get();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [user, setUser] = useState(null);
  const [activateMenu, setActivateMenu] = useState(false);
  const [authenticacion, setAuthenticacion] = useState(
    cookies.token ? true : false
  );
  const [allTareas, setAllTareas] = useState(null);
  const [tareaDetail, setTareaDetail] = useState(null);
  const [idTareas, setIdTareas] = useState([]);
  const [editError, setEditError] = useState("");
  const [crearTareaError, setCrearTareaError] = useState("");
  const verifyToken = () => axios.get("/user/token");
  useEffect(() => {
    const cookies = Cookies.get();
    if (cookies.token) {
      try {
        async function validate() {
          const { data } = await verifyToken(cookies.token);
          setAuthenticacion(true);
          setUser([data]);
        }
        validate();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  useEffect(() => {
    const array = [];
    allTareas &&
      allTareas.map((tareas) => {
        array.push(tareas.id);
        setIdTareas(array);
      });
  }, [allTareas]);

  const handlerRegistro = (event, userRegister) => {
    event.preventDefault();
    try {
      async function enviarDatos() {
        try {
          const { data } = await axios.post("/user/registro", userRegister);
          setUser(data);
          navigate("/login");
        } catch (error) {
          setAuthenticacion(false);
          setRegisterError(error.response.data);
        }
      }
      enviarDatos();
    } catch (error) {
      setAuthenticacion(false);
    }
  };
  const handlerLogin = (event, userLogin) => {
    event.preventDefault();
    try {
      async function login() {
        try {
          await axios.post("/user/login", userLogin);
          setAuthenticacion(true);
          navigate("/");
        } catch (error) {
          setAuthenticacion(false);
          setLoginError(error.response.data);
        }
      }
      login();
    } catch (error) {
      setAuthenticacion(false);
      setLoginError(error.response.data);
    }
  };

  const handlerLogout = () => {
    setActivateMenu((prev) => !prev);
    async function disconnect() {
      try {
        await axios.post("/user/logout");
        navigate("/");
        console.log(authenticacion);
        setAuthenticacion(false);
        console.log(authenticacion);
      } catch (error) {
        console.log(error);
      }
    }
    disconnect();
  };

  const getAllTareas = () => {
    async function getTareas() {
      try {
        const { data } = await axios("/tareas");
        setAllTareas(data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    getTareas();
  };
  const handlerAgregarTareas = (evento, datos) => {
    evento.preventDefault();
    if (datos.titulo.length < 3 || datos.tarea.length < 3) {
      return setCrearTareaError("Mínimo 3 letras");
    } else {
      setCrearTareaError("");
      async function agregarTarea() {
        try {
          await axios.post("/tareas/creartarea", datos);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
      agregarTarea();
    }
  };

  const getTareaDetail = (id) => {
    async function getTarea() {
      const { data } = await axios(`/tareas/${id}`);
      setTareaDetail(data);
    }
    getTarea();
  };

  const handlerDelete = (id) => {
    async function taskDelete() {
      try {
        await axios.delete(`tareas/${id}`);
        // Llamo a todas las tareas por que si no, no me renderiza las tareas actuales o la solucion que habia encontrado me creaba un bucle infinito
        getAllTareas();
      } catch (error) {
        console.log(error);
      }
    }
    taskDelete();
  };
  const handlerEdit = (evento, id, actualizarTarea) => {
    evento.preventDefault();
    if (actualizarTarea.tarea.length < 3 || actualizarTarea.titulo.length < 3) {
      return setEditError("Mínimo 4 caracteres");
    } else {
      setEditError("");
    }

    async function taskEdit() {
      try {
        await axios.put(`/tareas/${id}`, actualizarTarea);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
    taskEdit();
  };
  return (
    <AuthContext.Provider
      value={{
        handlerRegistro,
        user,
        handlerLogin,
        handlerLogout,
        authenticacion,
        loginError,
        registerError,
        getAllTareas,
        allTareas,
        handlerAgregarTareas,
        getTareaDetail,
        tareaDetail,
        idTareas,
        handlerDelete,
        handlerEdit,
        editError,
        setEditError,
        setActivateMenu,
        activateMenu,
        crearTareaError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
