export interface IProducts {
    _id: string,
    categoryId: string,
    image: string,
    name: string,
    description: string,
    price: number,
    shipping: number,
    stock: number
};

export type ProductCartData = {quantity: number} & Omit<IProducts, 'categoryId' | 'shipping' | 'stock'>;