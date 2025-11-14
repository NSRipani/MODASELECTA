import { Router } from 'express';
import { orderController } from '../../controllers/order.controllers.js';
import { passportCall } from './../../middleware/passportCall.js';
import checkAuthCookies from './../../auth/checkCookie.js';
import { roleAuth } from './../../middleware/roleUser.js';

const orderRouter = Router();

orderRouter.get('/', passportCall('current'), roleAuth(['admin', 'user']), checkAuthCookies, orderController.getAllOrders);
orderRouter.get('/user/:userId', passportCall('current'), roleAuth(['admin', 'user']),  checkAuthCookies, orderController.getUserOrders)
orderRouter.get('/:id', passportCall('current'), roleAuth(['admin']), checkAuthCookies, orderController.getOrderById);
orderRouter.delete('/:id', passportCall('current'), roleAuth(['admin']), checkAuthCookies, orderController.deleteOrder);

// PENDIENTE DE IMPLEMENTAR
// orderRouter.get("/date", orderController.getOrdersByDate);
// orderRouter.get("/date-range", orderController.getOrdersByDateRangeAndUser);
// orderRouter.put('/:id/status', orderController.updateOrderStatus);
// orderRouter.put('/:id/cancel', orderController.cancelOrder);
// orderRouter.put('/:id/pay', orderController.payOrder);
// orderRouter.post('/', passportCall('current'), roleAuth(['admin', 'user']), checkAuthCookies, orderController.createOrder);

export default orderRouter;
