import { Schema, model, Types } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = "users";
const schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        index: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    age: { type: Number, min: 0, max: 120 },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    cart: { type: Types.ObjectId, ref: "carts", required: true },
    isActive: { type: Boolean, default: true }
},{ 
    versionKey: false, 
    timestamps: true 
});


schema.plugin(mongoosePaginate)

const Users = model(collection, schema);
export default Users;