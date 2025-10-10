// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "../features/exchange.slice";
import grainsReducer from "../features/grains.slice";
import commoditiesReducer from "../features/commodities.slice";
import stockReducer from "../features/stock.slice";

export const store = configureStore({
    reducer: {
        exchange: exchangeReducer,
        grains: grainsReducer,
        commodities: commoditiesReducer,
        stock: stockReducer,
    },
    // middleware: (getDefault) => getDefault().concat(myMiddleware)  // 필요 시
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


