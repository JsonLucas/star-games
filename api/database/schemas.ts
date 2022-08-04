import { Schema } from 'mongoose';

export const usersSchema = new Schema({
    name: String,
    nickname: String,
    cpf: String,
    email: String,
    password: String,
    phone: String,
    levelId: Number
});

export const addressesSchema = new Schema({
    street: String,
    number: String,
    cep: String,
    userId: Number
});

export const cardsSchema = new Schema({
    name: String,
    number: String,
    cvv: String,
    expirationDate: Date,
    userId: Number
});

export const productsSchema = new Schema({
    name: String,
    price: Number,
    shipping: Number, //frete
    categoryId: Number,
    stock: Number,
    image: String
});

export const categoriesSchema = new Schema({
    name: String,
});

export const purchasesSchema = new Schema({
    userId: Number,
    productId: Number,
    createdAt: Date
});

export const levelsSchema = new Schema({
    name: String,
    features: Object,
    totalPoints: Number
});