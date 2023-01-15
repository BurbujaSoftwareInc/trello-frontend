import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cuenta } from "../Types";

const initialState: Cuenta = {
   idCuenta: 0,
   nombre: "",
   correo: ""
}

const CuentaSlice = createSlice({
   name: "cuenta",
   initialState,
   reducers: {
      setCuenta: (state, action: PayloadAction<Cuenta>) => {
         state.correo = action.payload.correo;
         state.idCuenta = action.payload.idCuenta;
         state.nombre = action.payload.nombre;
      }
   }
})

export const { setCuenta } = CuentaSlice.actions;
export default CuentaSlice.reducer;