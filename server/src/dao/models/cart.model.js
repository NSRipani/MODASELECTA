import { Schema, model, Types } from "mongoose";

const collection = "carts";
const cartSchema = new Schema({
    user: { type: Types.ObjectId, ref: "users", required: true, index: true, unique: true },
    products: {
        items: [
            { 
                prod: { type: Types.ObjectId, ref: "products", required: true, index: true },
                quantity: { type: Number, default: 1, min: 1},
                subtotal: { type: Number, required: true }
            }
        ]
    },
    total: { type: Number, required: true, default: 0 }
}, {
    timestamps: true 
});


const Cart = model(collection, cartSchema);
export default Cart;


