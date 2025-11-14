import Subscription from './models/suscription.model.js';

class SubscriptionDao {
    async createSubscription(data) {
        return await Subscription.create(data);
    }
    async findByEmail(email) {
        return await Subscription.findOne({ email });
    }
    async getAllSubscriptions() {
        return await Subscription.find();
    }
    async confirmSubscription(email) {
        return await Subscription.findOneAndUpdate(
            { email },
            { new: true }
        );
    }
    async deleteSubscription(email) {
        return await Subscription.findOneAndDelete({ email });
    }
}

export const subscriptionDao = new SubscriptionDao();