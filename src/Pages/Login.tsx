import React from "react";
import { Grid, TextField, Button, Typography, Paper, Checkbox,FormGroup, Link } from "@mui/material"
import { FormControlLabel} from "@mui/material"
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../App/store";
import { setState } from "../features/tasks/Slice";
import { setToken } from "../features/tasks/TokenSlice";

function Login() {

    const logstyle = {padding: 20, height:'20px auto', width: 300, margin:'20px auto'}
    const [loading, setLoading] = React.useState(false);
    const [miEmail, setMiEmail] = React.useState("");
    const [miPSSW, setMiPSSW] = React.useState("");
    const [goToHome, setGoToHome] = React.useState(false);

    
    const dispatch = useDispatch();
    const url ="https://trello-clone-367516.uc.r.appspot.com/iniciaSesion"
    const { session } = useSelector((state: RootState) => state)
    const { token } = useSelector((state: RootState) => state)
    
    const[cuenta, setCuenta] = React.useState({
      correo: "",
      passw: ""
    });
    
    async function fetchData(){
      const { data } = await axios.get(url,{
        params:{correo: cuenta.correo, passw: cuenta.passw},
      })
      return data.login
    }

    async function cambioUsr(event: { target: { value: React.SetStateAction<string>; }; }){
        setMiEmail(event.target.value);
        console.log(miEmail);
     }
     async function cambioPsw(event: { target: { value: React.SetStateAction<string>; }; }){
        setMiPSSW(event.target.value);
        console.log(miPSSW);
     }
  
    async function timeout() {
       return new Promise(function (resolve, reject) {
          // Setting 5000 ms time
          setTimeout(resolve, 5000);
       }).then(function () {
          console.log("funciona");
       });
    }
  
    async function demoLogin() {
       setLoading(true);
       if (miEmail === "" || miPSSW === ""){
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ingrese sus datos",
        });
       }
       else{
        cuenta.correo=miEmail,
        cuenta.passw=miPSSW,
        dispatch(setState(cuenta))
        const miResultado = await fetchData();
        console.log(miResultado)
        dispatch(setToken(miResultado))
        console.log(session)
        console.log(token.autorizado)
        if (!token.autorizado){
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Usuario no encontrado",
          })
          setLoading(false);
        }
        else{
          Swal.fire({
            icon: "success",
            title: "Funcionó",
            text: "Bienvenido " + miEmail,
          })
          setGoToHome(true);
        }
       }
       setLoading(false);
    }
    
    if (goToHome) {
        return <Navigate to="/home"/>
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
        <Paper elevation={10} style={logstyle} sx={{color: "white",backgroundColor: "#144272"}}>
            <Grid item sx={{textAlign:"center"}}>
              <Typography variant="h5" marginBottom={1}>
                Log In
              </Typography>
            </Grid>
            <Grid container direction="column" alignItems="center" justifyContent="center">
            <TextField
              variant="filled"
              label="Email"
              placeholder="Username"
              onChange= {cambioUsr}
              fullWidth required
              style={{ marginBottom: "2em" }} 
              sx={{backgroundColor: "#FFFFFF"}}    
            />
            <TextField
              variant="filled"
              label="Password"
              placeholder="Email"
              onChange= {cambioPsw}
              fullWidth required
              style={{ marginBottom: "2em" }}
              type="password"
              sx={{backgroundColor: "#FFFFFF"}}   
            />
            <Grid> 
              <FormGroup>
                <FormControlLabel control={<Checkbox/>} label="Remember Me" />
              </FormGroup>
            </Grid>
            <Link sx={{color: "#FFFFFF"}}> Forgot password? </Link>
            <Grid sx={{ textAlign: "center" }}>
                {loading ? (
                  <>
                      <Bars
                        height="40"
                        width="40"
                        color= "#FFFFFF"
                        ariaLabel="loading"
                        
                      />
                  </>
                ) : (
                <Button size="large" variant="contained" color="primary" onClick={demoLogin} sx={{marginTop: 2 }}>
                  LOG IN
                </Button>
                )}
            </Grid>
                <Link href="/register" sx={{marginTop: 2, color: "#FFFFFF"}}>Registrate aquí</Link>
            </Grid>
        </Paper>
      </Grid>
    );
  }

export default Login;