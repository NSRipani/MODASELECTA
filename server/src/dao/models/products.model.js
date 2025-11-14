import { Schema, model } from "mongoose";
import  mongoosePaginate from 'mongoose-paginate-v2'


const collection = "products";
const schema = new Schema({
    title: { type: String },
    photo: { type: String },
    category: { type: String },
    price: { type: Number } ,
    stock: { type: Number,  min: 0 },
    createdAt: { type: Date, default: Date.now }
});

schema.plugin(mongoosePaginate)

const Product = model(collection, schema);
export default Product;
