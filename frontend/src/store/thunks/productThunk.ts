import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { allApi } from "../../api/allApi.ts";
import {Product} from "../../types/types.ts";

interface MyThunkApiConfig {
    rejectValue: string;
}

export const getProductsThunk: AsyncThunk<Product[], void, MyThunkApiConfig> = createAsyncThunk<
    Product[],
    void,
    MyThunkApiConfig
>(
    "getProductsThunk",
    async (_, { rejectWithValue }) => {
        try {
            const products = await allApi.getProducts();
            return products;
        } catch (error) {
            return rejectWithValue('Failed to fetch products');
        }
    }
);

export const getProductThunk: AsyncThunk<Product, string, MyThunkApiConfig> = createAsyncThunk<
    Product,
    string,
    MyThunkApiConfig
>(
    "getProductThunk",
    async (id, { rejectWithValue }) => {
        try {
            const product = await allApi.getProduct(id);
            return product;
        } catch (error) {
            return rejectWithValue('Failed to fetch product');
        }
    }
);
