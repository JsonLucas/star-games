import { IProducts } from "./products";

export interface IPurchases {
    _id: string,
    userId: String,
    productData: IProducts,
    createdAt: Date,
    status: String
}