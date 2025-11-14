import { Schema, model } from 'mongoose';

const suscrip = 'Subscription'
const subscriptionSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
}, { 
    versionKey: false, 
    timestamps: true 
});

const Subscription = model(suscrip, subscriptionSchema);

export default Subscription;