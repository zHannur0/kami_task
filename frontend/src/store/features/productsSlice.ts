import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {initialStateProducts} from "../types/types.ts";
import {Product} from "../../types/types.ts";
import {getProductsThunk, getProductThunk} from "../thunks/productThunk.ts";

const productsSlice = createSlice({
    name: 'products',
    initialState: initialStateProducts,
    reducers: {
    },
    extraReducers: function (builder) {
        builder
            .addCase(
                getProductsThunk.fulfilled,
                (state, action: PayloadAction<Product[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            products: action.payload,
                        };
                    }
                    return state;
                },
            ).addCase(
            getProductThunk.fulfilled,
            (state, action: PayloadAction<Product>) => {
                if (action.payload) {
                    return {
                        ...state,
                        product: action.payload,
                    };
                }
                return state;
            },
        )
    }
});

export const { actions } = productsSlice;

export default productsSlice.reducer;
