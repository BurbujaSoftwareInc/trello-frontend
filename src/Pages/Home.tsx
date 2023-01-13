import React from "react";
import { Navigate } from "react-router-dom";
import { setToken } from "../features/tasks/TokenSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../App/store";

function Home() {

    const { token } = useSelector((state: RootState) => state)
    const[autorizado, setAutorizado] = React.useState(false)
    const dispatch = useDispatch();

    async function cerrarSesion(){
        setAutorizado(false),
        dispatch(setToken(autorizado))
    }

    if(!token.autorizado){
        return <Navigate to="/" />
    }


    return (
        <div>
            Autorizado de estar aquí
            <button onClick={cerrarSesion}>Ir al login</button>
        </div>
    )
}

export default Home;