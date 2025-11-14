import { subscriptionService } from '../service/suscrip.service.js';
import logger from '../utils/logger.js';

class SubscriptionController {
    
    async subscribe (req, res, next){
        try {
            const { email } = req.body;
            if (!email) {
                logger.warn('Subscription attempt without email');
                return res.status(400).json({ message: 'Email requerido' });
            }
            const suscription = await subscriptionService.subscribe({ email });
            res.status(201).json({ message: 'Suscripción creada', payload: suscription });
            logger.info(`New subscription created for email: ${email}`);
        } catch (error) {
            logger.error('Error creating subscription');
            next(error);
        }
    };
    
    async confirmSubscription (req, res, next) {
        try {
            const { email } = req.body;
            if (!email) {
                logger.warn('Confirmation attempt without email');
                return res.status(400).json({ message: 'Email requerido' });
            }
            const subscription = await subscriptionService.confirm(email);
            res.status(200).json({ message: 'Suscripción confirmada', payload: subscription });
            logger.info(`Subscription confirmed for email: ${email}`);
        } catch (error) {
            logger.error('Error confirming subscription');
            next(error);
        }
    };
    
    async getAllSuscriptions (req, res, next) {
        try {
            const subscriptions = await subscriptionService.getAll();
            if (!subscriptions || subscriptions.length === 0) {
                logger.warn('No subscriptions found in the database');
                return res.status(404).json({ message: 'No hay suscripciones para mostrar' });
            }
            res.status(200).json(subscriptions);
            logger.info('All subscriptions retrieved successfully');
        } catch (error) {
            logger.error('Error retrieving all subscriptions');
            next(error);
        }
    };
    
    async deleteSuscription (req, res, next) {
        try {
            const { email } = req.body;
            if (!email) {
                logger.warn('Deletion attempt without email');
                return res.status(400).json({ message: 'Email requerido' });
            }
            const deleted = await subscriptionService.delete(email);
            if (!deleted) {
                logger.warn(`No subscription found to delete for email: ${email}`);
                return res.status(404).json({ message: 'Suscripción no encontrada o no eliminada' });
            }
            res.status(200).json({ message: 'Suscripción eliminada', payload: deleted });
        } catch (error) {
            logger.error('Error deleting subscription');
            next(error);
        }
    };
}
export const subscriptionController = new SubscriptionController();