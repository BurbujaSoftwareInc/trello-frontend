import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Cuenta, token } from '../auth'

const initialState: token = {
    autorizado: false
  }
  
  export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
      setToken: (state, action: PayloadAction<boolean>) => {
        console.log(state, action)
        state.autorizado=action.payload
      }
    }
  })
  
  
  export const { setToken } = tokenSlice.actions
  
  export default tokenSlice.reducer