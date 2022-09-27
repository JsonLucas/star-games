export interface IProducts {
    id: number
    name: string,
    description: string,
    price: number,
    shipping: number,
    categoryId: number,
    stock: number,
    image: string,
    createdAt?: Date
	updatedAt?: Date
};

export type ProductCartData = {quantity: number, updatedStock: number} & Omit<IProducts, 'categoryId' | 'shipping' | 'stock'>;