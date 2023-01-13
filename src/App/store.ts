import { configureStore } from "@reduxjs/toolkit";
import SessionReducer from "../features/tasks/Slice"
import tokenReducer from "../features/tasks/TokenSlice";


export const store = configureStore({
    reducer: {
        session: SessionReducer,
        token: tokenReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;