import { IProducts } from "./products";

export interface IPurchases {
    id: number,
    userId: number,
    productData: IProducts,
    createdAt: Date,
    status: String
}