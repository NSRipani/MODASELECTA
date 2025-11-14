import { Router } from 'express';
import { subscriptionController } from './../../controllers/suscrip.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.post('/', subscriptionController.subscribe);
subscriptionRouter.post('/confirm', subscriptionController.confirmSubscription);
subscriptionRouter.get('/', subscriptionController.getAllSuscriptions);
subscriptionRouter.delete('/', subscriptionController.deleteSuscription);

export default subscriptionRouter;