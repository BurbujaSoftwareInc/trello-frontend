import { configureStore } from "@reduxjs/toolkit";
import SessionReducer from "../Redux/SessionSlice";
import CuentaReducer from "../Redux/CuentaSlice";
import MisProyectosReducer from "../Redux/MisProyectosSlice";

export const store = configureStore({
    reducer: {
        session: SessionReducer,
        cuenta: CuentaReducer,
        misProyectos: MisProyectosReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;