import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice.ts';

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const { getState, dispatch } = store;

export type RootState = ReturnType<typeof getState>;
export type AppDispatch = typeof dispatch;
