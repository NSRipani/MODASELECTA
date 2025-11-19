import { Schema, model, Types } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = "users";
const schema = new Schema({
    first_name: {type: String },
    last_name: {type: String },
    email: { type: String, unique: true, index: true},
    age: {type: Number },
    password: { type: String },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    cart: { type: Types.ObjectId, ref: "carts", require: true, index: true },
},{ 
    versionKey: false, 
    timestamps: true 
});


schema.plugin(mongoosePaginate)

const Users = model(collection, schema);
export default Users;