import { configureStore } from "@reduxjs/toolkit";
import SessionReducer from "../Redux/SessionSlice";

export const store = configureStore({
    reducer: {
        session: SessionReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;