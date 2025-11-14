import { subscriptionDao } from '../dao/dao.subscrip.js';

class SubscriptionRepository {
    async create(data) {
        return await subscriptionDao.createSubscription(data);
    }
    async findByEmail(email) {
        return await subscriptionDao.findByEmail(email);
    }
    async getAll() {
        return await subscriptionDao.getAllSubscriptions();
    }
    async confirm(email) {
        return await subscriptionDao.confirmSubscription(email);
    }
    async delete(email) {
        return await subscriptionDao.deleteSubscription(email);
    }
}

export const subscriptionRepository = new SubscriptionRepository();