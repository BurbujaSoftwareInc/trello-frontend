import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MiProyecto } from "../Types";

// Buscamos guardar de 0 a N proyectos, pues cada usuario puede tener esa cantidad
const initialState: { proyectos: MiProyecto[] } = {
   proyectos: []
}

const MisProyectosSlice = createSlice({
   name: "misProyectos",
   initialState,
   reducers: {
      addProyecto: (state, action: PayloadAction<MiProyecto>) => {
         // Agregamos un nuevo proyecto a la lista
         state.proyectos.push(action.payload);
      },
      setMisProyectos: (state, action: PayloadAction<MiProyecto[]>) => {
         state.proyectos = [...action.payload];
      }
   }
})

export const { addProyecto, setMisProyectos } = MisProyectosSlice.actions;
export default MisProyectosSlice.reducer;