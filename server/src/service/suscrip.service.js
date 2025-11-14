import { subscriptionRepository } from '../repository/suscripRepository.js';

class SubscriptionService {
    async subscribe(data) {
        const exist = await subscriptionRepository.findByEmail(data.email);
        if (exist) throw new Error('El email ya está suscrito');
        return await subscriptionRepository.create(data);
    }
    async confirm(email) {
        const updated = await subscriptionRepository.confirm(email);
        if (!updated) throw new Error('Suscripción no encontrada');
        return updated;
    }
    async getAll() {
        return await subscriptionRepository.getAll();
    }
    async delete(email) {
        const deleted = await subscriptionRepository.delete(email);
        if (!deleted) throw new Error('Suscripción no encontrada');
        return deleted;
    }
}

export const subscriptionService = new SubscriptionService();