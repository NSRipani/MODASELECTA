import { Schema, model, Types } from "mongoose";

const collection = "carts";
const cartSchema = new Schema({
    user: { type: Types.ObjectId, ref: "users", required: true, index: true },
    products: {
        items: [
            { 
                prod: { type: Types.ObjectId, ref: "products", required: true, index: true },
                quantity: { type: Number, default: 1},
                subtotal: { type: Number, require: true }
            }
        ]
    },
    total: { type: Number, require: true, default: 0 }
}, {
    timestamps: true 
});



const Cart = model(collection, cartSchema);
export default Cart;


