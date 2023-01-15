import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "../Types";

const initialState: Session = {
   token: false,
   url: "https://3ede-2806-2f0-9100-c689-535f-7d7b-d701-29fa.ngrok.io"
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