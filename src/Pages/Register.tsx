import React from "react";
import {
   Grid,
   TextField,
   Button,
   Typography,
   Paper,
   Link,
} from "@mui/material";
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../App/store";
import { setToken } from "../Redux/SessionSlice";
import { setCuenta } from "../Redux/CuentaSlice";
import axios, { AxiosError } from "axios";
import { Cuenta } from "../Types";

function Register() {
   const logstyle = {
      padding: 20,
      height: "20px auto",
      width: 300,
      margin: "20px auto",
   };
   const navigate = useNavigate();
   const [loading, setLoading] = React.useState(false);
   const [miNombre, setMiNombre] = React.useState("");
   const [miPSSW, setMiPSSW] = React.useState("");
   const [miPSSWConf, setMiPSSWConf] = React.useState("");
   const [miEmail, setMiEmail] = React.useState("");
   const dispatch = useDispatch();
   const { session } = useSelector((state: RootState) => state);

   async function postData(): Promise<{
      msg: string;
      registro: boolean;
      cuenta?: Cuenta;
   }> {
      try {
         const { data } = await axios.post(`${session.url}/login/registro`, {
            correo: miEmail,
            nombre: miNombre,
            passw: miPSSW,
         });
         return data;
      } catch (e) {
         const error = e as AxiosError;
         const msgError = error.response?.data as string;
         return {
            msg: `Tuvimos un error al procesar tu solicitud: ${msgError}`,
            registro: false,
         };
      }
   }

   async function cambioUsr(event: {
      target: { value: React.SetStateAction<string> };
   }) {
      setMiNombre(event.target.value);
   }
   async function cambioPsw(event: {
      target: { value: React.SetStateAction<string> };
   }) {
      setMiPSSW(event.target.value);
   }
   async function cambioPswConf(event: {
      target: { value: React.SetStateAction<string> };
   }) {
      setMiPSSWConf(event.target.value);
   }
   async function cambioEmail(event: {
      target: { value: React.SetStateAction<string> };
   }) {
      setMiEmail(event.target.value);
   }

   async function demoRegis(event: { preventDefault: any }) {
      event.preventDefault;
      setLoading(true);
      if (
         miNombre === "" ||
         miPSSW === "" ||
         miPSSWConf === "" ||
         miEmail === ""
      ) {
         Swal.fire({
            icon: "error",
            title: "Error al ingresar datos",
            text: "Por favor revisa que no se te haya olvidado algún campo",
         });
      } else if (miPSSW !== miPSSWConf) {
         Swal.fire({
            icon: "error",
            title: "No coinciden las contraseñas",
            text: "Por favor revisa que las contraseñas sean las mismas",
         });
      } else {
         const { registro, msg, cuenta } = await postData(); // Petición al backend
         // primero debemos revisar que se hizo todo correcto con el back para guardar la sesion en Redux
         if (!registro) {
            Swal.fire({
               icon: "error",
               title: "Error en el Registro",
               text: msg,
            });
         } else {
            // si todo bien en el back, podemos hacer el dispatch de redux
            dispatch(setCuenta(cuenta as Cuenta));
            dispatch(setToken(true));
            Swal.fire({
               icon: "success",
               title: "Registro completo",
               text: "Se ha registrado con éxito " + miNombre,
            });
            navigate("/home");
         }
      }
      setLoading(false);
   }

   return (
      <Grid
         container
         justifyContent="center"
         alignItems="center"
         direction="column"
         style={{ minHeight: "100vh" }}
         spacing={5}
      >
         <Paper
            elevation={10}
            style={logstyle}
            sx={{ color: "white", backgroundColor: "#144272" }}
         >
            <Grid item sx={{ textAlign: "center" }}>
               <Typography variant="h5" marginBottom={1}>
                  Registro
               </Typography>
            </Grid>
            <Grid
               container
               direction="column"
               alignItems="center"
               justifyContent="center"
            >
               <TextField
                  variant="filled"
                  label="Username"
                  placeholder="Username"
                  onChange={cambioUsr}
                  fullWidth
                  required
                  style={{ marginBottom: "2em" }}
                  sx={{ backgroundColor: "#FFFFFF" }}
               />
               <TextField
                  variant="filled"
                  label="Email"
                  placeholder="Email"
                  onChange={cambioEmail}
                  fullWidth
                  required
                  style={{ marginBottom: "2em" }}
                  sx={{ backgroundColor: "#FFFFFF" }}
               />
               <TextField
                  variant="filled"
                  label="Password"
                  placeholder="Password"
                  onChange={cambioPsw}
                  fullWidth
                  required
                  style={{ marginBottom: "2em" }}
                  type="password"
                  sx={{ backgroundColor: "#FFFFFF" }}
               />
               <TextField
                  variant="filled"
                  label="Confirmar Password"
                  placeholder="Confirmar Password"
                  onChange={cambioPswConf}
                  fullWidth
                  required
                  style={{ marginBottom: "2em" }}
                  type="password"
                  sx={{ backgroundColor: "#FFFFFF" }}
               />
               <Grid sx={{ textAlign: "center" }}>
                  {loading ? (
                     <>
                        <Bars
                           height="40"
                           width="40"
                           color="#FFFFFF"
                           ariaLabel="loading"
                        />
                     </>
                  ) : (
                     <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={demoRegis}
                     >
                        Registrar
                     </Button>
                  )}
               </Grid>
               <Grid sx={{ marginTop: 2, textAlign: "center" }}>
                  <Link href="/" sx={{ color: "#FFFFFF" }}>
                     ¿Ya tiene una cuenta? Inicie sesión
                  </Link>
               </Grid>
            </Grid>
         </Paper>
      </Grid>
   );
}

export default Register;
