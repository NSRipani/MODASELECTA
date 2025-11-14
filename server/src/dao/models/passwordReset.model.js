import { Schema, model, Types } from "mongoose";

const collection = "passwordResets";
const passwordResetSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true, },
    code: { type: String, required: true, },
    expiresAt: { type: Date, required: true, },
    used: { type: Boolean, default: false, },
});

const  passwordReset  = model(collection, passwordResetSchema);
export default passwordReset;
