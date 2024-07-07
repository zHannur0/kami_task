import {Product} from "../../types/types.ts";

export interface ProductInfo {
    products?: Product[],
    product?: Product,
}

export const initialStateProducts: ProductInfo = {
    products: [],
    product: {},
}