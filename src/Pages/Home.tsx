import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../App/store";
import { Proyecto, MiProyecto } from "../Types";
import { setMisProyectos, addProyecto } from "../Redux/MisProyectosSlice";
import { ProgressBar } from "react-loader-spinner";
import Swal from "sweetalert2";

function Home() {
   const dispatch = useDispatch();
   const { session, cuenta, misProyectos } = useSelector((state: RootState) => state);
   const [loader, setLoader] = React.useState(false);

   // Variables auxiliares para guardar los inputs del usuario en la creación de un proyecto
   const [nombreProyecto, setNombreProyecto] = React.useState("");

   async function getProyectos(): Promise<{
      msg: string;
      success: boolean;
      proyectos?: MiProyecto[];
   }> {
      try {
         const { data } = await axios.get(`${session.url}/proyecto/getProyectos`, {
            headers: {
               "ngrok-skip-browser-warning": "any",
            },
            params: {
               idCuenta: cuenta.idCuenta,
            },
         });
         return data;
      } catch (e) {
         return { msg: "Error en la petición del servidor", success: false };
      }
   }

   // Como el que se creó es owner del proyecto, regresamos id del Recurso y el proyecto
   async function creaProyecto(): Promise<{
      msg: string;
      success: boolean;
      proyecto?: Proyecto;
      idRecurso?: number;
   }> {
      try {
         const { data } = await axios.post(`${session.url}/proyecto/creaProyecto`, {
            idCuenta: cuenta.idCuenta,
            nombreProyecto: nombreProyecto,
         });
         return data;
      } catch (e) {
         return { msg: "Error en la petición del servidor", success: false };
      }
   }

   // Esta función se ejecuta solo una vez cuando se renderiza por primera vez el componente
   // si imprime esto dos veces es porque andamos en StrictMode, si desean saber más: https://www.youtube.com/watch?v=eFx6xZYLpcE
   React.useLayoutEffect(() => {
      const init = async () => {
         const { msg, success, proyectos } = await getProyectos();
         if (!success) {
            console.log(msg);
         }
         // sabemos que el backend ya hace la validación que solo envíe los proyectos si existen, entonces podemos hacer el cast de proyectos
         else {
            console.log(proyectos);
            // Actualizamos la variable global de redux
            dispatch(setMisProyectos(proyectos as MiProyecto[]));
         }
      };
      // useEffect no deja realizar peticiones asíncronas dentro de ella, entonces creamos una funcion asíncrona dentro de la misma y la llamamos
      init();
   }, []);

   return (
      <Grid
         container
         direction="row"
         justifyContent="center"
         alignItems="center"
         sx={{ textAlign: "center" }}
      >
         <Grid item xs={12}>
            <h3>/getProyectos</h3>
            <Grid container direction="row" justifyContent="center" alignItems="center">
               {/* La función map ejecuta una función al arreglo MisProyecto por cada elemento, ie, en cada elemento mappea un elemento JSX con los datos de MiProyecto */}
               {misProyectos.proyectos.map((proyecto) => (
                  <Grid item xs={12}>
                     <h4>ID: {proyecto.idProyecto}</h4>
                     <h4>Nombre: {proyecto.nombre}</h4>
                     <h4>Fecha Inicio: {proyecto.fechaInicio.toString()}</h4>
                     <h4>Recurso: {proyecto.idRecurso}</h4>
                  </Grid>
               ))}
            </Grid>
         </Grid>
         <Grid item xs={12}>
            <h3>/creaProyecto</h3>
            <TextField
               label="Nombre Del Proyecto"
               onChange={(event) => {
                  setNombreProyecto(event.target.value);
               }}
            />
            {loader ? (
               <>
                  <ProgressBar
                     height="80"
                     width="80"
                     ariaLabel="progress-bar-loading"
                     wrapperStyle={{}}
                     wrapperClass="progress-bar-wrapper"
                     borderColor="#F4442E"
                     barColor="#51E5FF"
                  />
               </>
            ) : (
               <Button
                  variant="outlined"
                  onClick={async () => {
                     setLoader(true);
                     const { success, msg, proyecto, idRecurso } = await creaProyecto();
                     setLoader(false);
                     if (!success) {
                        Swal.fire({
                           icon: "error",
                           title: "Error en la creación del proyecto",
                           text: msg,
                        });
                     } else {
                        // como el back se encarga de mandar los datos si y solo si se guarda correctamente en la base, entonces ya podemos asumir que el proyecto y el idRecurso recien creado existen
                        // Guardamos el proyecto a la lista de mis proyectos, esto es creando un objeto de Tipo MiProyecto que pide, además de los atributos de proyecto, un idRecurso, que el back ya no los manda
                        const miProyecto: MiProyecto = {
                           idRecurso: idRecurso as number,
                           nombre: (proyecto as Proyecto).nombre,
                           idProyecto: (proyecto as Proyecto).idProyecto,
                           fechaInicio: (proyecto as Proyecto).fechaInicio,
                        };
                        dispatch(addProyecto(miProyecto));
                        Swal.fire({
                           icon: "success",
                           title: "Proyecto Creado Correctamente",
                           text: msg,
                        });
                     }
                  }}
               >
                  Crea Proyecto
               </Button>
            )}
         </Grid>
      </Grid>
   );
}

export default Home;
