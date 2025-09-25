// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "../features/exchange.slice";

export const store = configureStore({
    reducer: {
        exchange: exchangeReducer,
    },
    // middleware: (getDefault) => getDefault().concat(myMiddleware)  // 필요 시
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


