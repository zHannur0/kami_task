import { instance } from "./axios.instance";
import {Product} from "../types/types.ts";

export const allApi= {
    async getProducts(): Promise<Product[]> {
        return await instance.get("/api/products/");
    },
    async getProduct(id?:string): Promise<Product> {
        return await instance.get(`/api/products/${id}`);
    }
}