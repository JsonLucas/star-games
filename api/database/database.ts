import mongoose from "mongoose";
import { dbUrl } from "../utils/envConfig";

const db = () => {
    if(!dbUrl) throw { code: 500 };
    try{
        mongoose.connect(dbUrl);
        mongoose.connection.on('error', (e) => { 
            console.log(e); 
        }).once('open', () => { console.log('database connected.'); })
    }
    catch(e: any){
        throw {code: 500, error: e};
    }
}

export default db;