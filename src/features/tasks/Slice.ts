import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Cuenta, token } from '../auth'

const initialState: Cuenta = {
  nombre: "",
  correo: "",
  passw: "",

}

export const SessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Cuenta>) => {
      console.log(state, action)
      state.correo=action.payload.correo
      state.nombre=action.payload.nombre
      state.passw=action.payload.passw 
    }
  }
})


export const { setState } = SessionSlice.actions

export default SessionSlice.reducer