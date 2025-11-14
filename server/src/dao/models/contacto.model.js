import { Schema, model, Types } from "mongoose";

const colletion = 'contact'
const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, { 
    versionKey: false, 
    timestamps: true 
});

const ContactModel = model(colletion, contactSchema);
export default ContactModel