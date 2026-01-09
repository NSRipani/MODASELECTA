import { Schema, model, Types } from "mongoose";

const colection = 'contact'
const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    message: { type: String, required: true }
}, { 
    versionKey: false, 
    timestamps: true 
});

const ContactModel = model(colection, contactSchema);
export default ContactModel