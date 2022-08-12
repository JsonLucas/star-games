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

export type ProductCartData = Pick<IProducts, '_id' | 'name' | 'price' | 'image'>;