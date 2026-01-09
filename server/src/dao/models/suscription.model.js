import { Schema, model } from 'mongoose';

const suscrip = 'subscriptions'
const subscriptionSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
}, { 
    versionKey: false, 
    timestamps: true 
});

const Subscription = model(suscrip, subscriptionSchema);

export default Subscription;