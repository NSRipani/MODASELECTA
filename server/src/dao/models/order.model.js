import { Schema, model, Types } from "mongoose";

const collection = 'order';
const orderSchema = new Schema({
    cart: { type: Schema.Types.ObjectId, ref: 'carts', required: true, index: true, unique: true },
    status: { type: String, enum: ['Pendiente', 'Pagada', 'Procesando', 'Enviada', 'Entregada', 'Cancelada'], default: 'Pendiente' },
    createdAt: {type: Date, default: Date.now()}
}, { timestamps: true });



const Order = model(collection, orderSchema);
export default Order;