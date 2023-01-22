import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "../Types";

const initialState: Session = {
   token: false,
   url: "http://localhost:8080"
}

export const SessionSlice = createSlice({
   name: "session",
   initialState,
   reducers: {
      setToken: (state, action: PayloadAction<boolean>) => {
         state.token = action.payload;
      },
      setUrl: (state, action: PayloadAction<string>) => {
         state.url = action.payload;
      }
   }
})

export const { setToken, setUrl } = SessionSlice.actions;
export default SessionSlice.reducer
