import React from "react";
import {
   Grid,
   TextField,
   Button,
   Typography,
   Paper,
   Checkbox,
   FormGroup,
   Link,
   FormControlLabel,
} from "@mui/material";
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../App/store";
import { Cuenta } from "../Types";
import { setCuenta } from "../Redux/CuentaSlice";
import { setToken } from "../Redux/SessionSlice";

function Login() {
   const logstyle = {
      padding: 20,
      height: "20px auto",
      width: 300,
      margin: "20px auto",
   };
   const navigate = useNavigate();
   const [loading, setLoading] = React.useState(false);
   const [miEmail, setMiEmail] = React.useState("");
   const [miPSSW, setMiPSSW] = React.useState("");
   const dispatch = useDispatch();
   const { session } = useSelector((state: RootState) => state);

   async function fetchData(): Promise<{
      msg: string;
      login: boolean;
      cuenta?: Cuenta;
   }> {
      try {
         const { data } = await axios.get(
            `${session.url}/login/iniciaSesion`,
            {
               headers: {
                  "ngrok-skip-browser-warning": "any",
               },
               params: {
                  correo: miEmail,
                  passw: miPSSW,
               },
            }
         );
         return data;
      } catch (e) {
         const error = e as AxiosError;
         const msgError = error.response?.data as string;
         return {
            msg: `Tuvimos un error al procesar tu solicitud: ${msgError}`,
            login: false,
         };
      }
   }

   async function cambioUsr(event: {
      target: { value: React.SetStateAction<string> };
   }) {
      setMiEmail(event.target.value);
   }
   async function cambioPsw(event: {
      target: { value: React.SetStateAction<string> };
   }) {
      setMiPSSW(event.target.value);
   }

   async function demoLogin() {
      setLoading(true);
      if (miEmail === "" || miPSSW === "") {
         Swal.fire({
            icon: "error",
            title: "Tienes campos vacíos",
            text: "Por favor revisa que no se te olvide ingresar un dato",
         });
      } else {
         const { msg, login, cuenta } = await fetchData();
         if (!login) {
            Swal.fire({
               icon: "error",
               title: "Acceso denegado",
               text: msg,
            });
         } else {
            dispatch(setToken(true));
            dispatch(setCuenta(cuenta as Cuenta));
            Swal.fire({
               icon: "success",
               title: `Bienvenido ${cuenta?.nombre}`,
               text: "Qué gusto tenerte de vuelta",
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
                  Log In
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
                  label="Email"
                  placeholder="Username"
                  onChange={cambioUsr}
                  fullWidth
                  required
                  style={{ marginBottom: "2em" }}
                  sx={{ backgroundColor: "#FFFFFF" }}
               />
               <TextField
                  variant="filled"
                  label="Password"
                  placeholder="Email"
                  onChange={cambioPsw}
                  fullWidth
                  required
                  style={{ marginBottom: "2em" }}
                  type="password"
                  sx={{ backgroundColor: "#FFFFFF" }}
               />
               <Grid>
                  <FormGroup>
                     <FormControlLabel
                        control={<Checkbox />}
                        label="Remember Me"
                     />
                  </FormGroup>
               </Grid>
               <Link sx={{ color: "#FFFFFF" }}> Forgot password? </Link>
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
                        onClick={demoLogin}
                        sx={{ marginTop: 2 }}
                     >
                        LOG IN
                     </Button>
                  )}
               </Grid>
               <Link href="/register" sx={{ marginTop: 2, color: "#FFFFFF" }}>
                  Registrate aquí
               </Link>
            </Grid>
         </Paper>
      </Grid>
   );
}

export default Login;
