import { model } from "mongoose";
import { 
    addressesSchema, 
    cardsSchema, 
    categoriesSchema, 
    levelsSchema, 
    productsSchema, 
    purchasesSchema, 
    usersSchema 
} from "./schemas";

export const users = model('users', usersSchema);
export const addresses = model('addresses', addressesSchema);
export const cards = model('cards', cardsSchema);
export const products = model('products', productsSchema);
export const categories = model('categories', categoriesSchema);
export const purchases = model('purchases', purchasesSchema);
export const levels = model('levels', levelsSchema);