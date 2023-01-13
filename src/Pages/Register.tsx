import React from "react";
import { Grid, TextField, Button, Typography, Paper,Link } from "@mui/material"
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setState } from "../features/tasks/Slice";
import { RootState } from "../App/store";
import axios from "axios";

function Register() {

    const logstyle={padding: 20, height:'20px auto', width: 300, margin:'20px auto'}
    const [loading, setLoading] = React.useState(false);
    const [miNombre, setMiNombre] = React.useState("");
    const [miPSSW, setMiPSSW] = React.useState("");
    const [miPSSWConf, setMiPSSWConf] = React.useState("");
    const [miEmail, setMiEmail] = React.useState("");
    const [goToHome, setGoToHome] = React.useState(false);
    const dispatch = useDispatch();

    const url ="https://trello-clone-367516.uc.r.appspot.com/registro"
    const[cuenta, setCuenta] = React.useState({
      nombre: "",
      correo: "",
      passw: ""
    });

    const { session } = useSelector((state: RootState) => state)


    async function timeout() {
       return new Promise(function (resolve, reject) {
          // Setting 5000 ms time
          setTimeout(resolve, 5000);
       }).then(function () {
          console.log("Wrapped setTimeout after 5000ms");
       });
    }

    async function postData() {
      axios.post(url,{
        nombre:cuenta.nombre, 
        correo: cuenta.correo, 
        passw: cuenta.passw,
      }).then(res => { console.log(res.data)})
    }
  
    async function cambioUsr(event: { target: { value: React.SetStateAction<string>; }; }){
       setMiNombre(event.target.value);
    }
    async function cambioPsw(event: { target: { value: React.SetStateAction<string>; }; }){
       setMiPSSW(event.target.value);       
    
    }
    async function cambioPswConf(event: { target: { value: React.SetStateAction<string>; }; }){
        setMiPSSWConf(event.target.value);
     
    }
    async function cambioEmail(event: { target: { value: React.SetStateAction<string>; }; }){
        setMiEmail(event.target.value);
        
     }
  
    async function demoRegis(event: { preventDefault: any; }) {
      event.preventDefault
       setLoading(true);
       if (miNombre === "" || miPSSW === "" || miPSSWConf === "" || miEmail === ""){
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ingrese sus datos",
        });
       }
       else if (miPSSW !== miPSSWConf){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No coinciden las contraseñas",
          });
       }else{

          cuenta.correo=miEmail
          cuenta.nombre=miNombre
          cuenta.passw=miPSSW
          dispatch(setState(cuenta))
          await postData(); // Petición al baackend
          Swal.fire({
            icon: "success",
            title: "Funcionó",
            text: "Se ha registrado con éxito "+ miNombre,
          });
        //setGoToHome(true);
       }
       setLoading(false);
    }
    //if (goToHome) {o
    //    return <Navigate to="/Home"/>
    //}

  
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
                Registro
              </Typography>
            </Grid>
            <Grid container direction="column" alignItems="center" justifyContent="center">
            <TextField
              variant="filled"
              label="Username"
              placeholder="Username"
              onChange= {cambioUsr}
              fullWidth required
              style={{ marginBottom: "2em" }} 
              sx={{backgroundColor: "#FFFFFF"}}    
            />
            <TextField
              variant="filled"
              label="Email"
              placeholder="Email"
              onChange= {cambioEmail}
              fullWidth required
              style={{ marginBottom: "2em" }} 
              sx={{backgroundColor: "#FFFFFF"}}    
            />
            <TextField
              variant="filled"
              label="Password"
              placeholder="Password"
              onChange= {cambioPsw}
              fullWidth required
              style={{ marginBottom: "2em" }}
              type="password"
              sx={{backgroundColor: "#FFFFFF"}}   
            />
            <TextField
              variant="filled"
              label="Confirmar Password"
              placeholder="Confirmar Password"
              onChange= {cambioPswConf}
              fullWidth required
              style={{ marginBottom: "2em" }}
              type="password"
              sx={{backgroundColor: "#FFFFFF"}}   
            />
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
                <Button size="large" variant="contained" color="primary" onClick={demoRegis}>
                  Registrar
                </Button>
                )}
            </Grid>
            <Grid sx={{ marginTop: 2, textAlign: "center" }}>
              <Link href="/" sx={{color: "#FFFFFF"}}>¿Ya tiene una cuenta? Inicie sesión</Link>
            </Grid>
            </Grid>
        </Paper>

      </Grid>
    );
  }

export default Register;
