import logger from '../utils/logger.js';
import { orderService } from './../service/order.service.js';

class OrdeController {
    async createOrder(req, res, next) {
        try {
            const { cart } = req.body;
            console.log(`CREATEorder: ${cart}`)
            const newOrder = await orderService.createOrder(cart);
            logger.info(`NewOrder order: ${newOrder}`)
            logger.info('Order created successfully');
            res.status(201).json({message: 'Created Order', order: newOrder});
        } catch (err) {
            logger.error('Error creating order');
            next(err);
        }
    };
    
    async getAllOrders(req, res, next) {
        try {
            const orders = await orderService.getAllOrders();
            logger.info(`Listado de ${orders.length} orders`)
            res.status(200).json({message: 'ALL ORDER', order: orders});
        } catch (error) {
            logger.error('Error retrieving all orders');
            next(error);
        }
    };
    
    async getOrderById(req, res, next) {
        try {
            const { id } = req.params
            const order = await orderService.getOrderById(id);
            res.status(200).json({message: 'ID ORDER', order: order});
            logger.info(`Order found: ${order.id}`)
        } catch (error) {
            logger.error('Error retrieving order by ID');
            next(error);
        }
    };

    
    async getUserOrders(req, res, next) {
        try {
            const { user } = req.params;
            const orders = await orderService.getOrdersByUser(user);
            logger.info(`Orders DE USER(CONTROLLER) ${orders.length}`)
            res.status(200).json({message: 'USER ORDER', order: orders});
        } catch (error) {
            logger.error('Error retrieving orders by user');
            next(error);
        }
    };
    // async getOrderById(req, res, next) {
    //     try {
    //         const { user } = req.body
    //         const order = await orderService.getOrdersByUser(user);
    //         res.status(200).json({message: 'USER ID ORDER', order: order});
    //     } catch (err) {
    //         next(err);
    //     }
    // };
    async updateOrderStatus(req, res, next){
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedOrder = await orderService.updateOrderStatus(id, status);
            logger.info(`Order status updated: ${updatedOrder}`)
            res.status(200).json({message: 'STATUS ORDER', status: updatedOrder});
        } catch (error) {
            logger.error('Error updating order status');
            next(error)
        }
    };
    // async payOrder (req, res, next) {
    //     try {
    //         const updatedOrder  = await orderService.markAsPaid(req.params.oid);
    //         res.status(200).json({ message: 'Orden marcada como pagada', order: updatedOrder });
    //     } catch (err) {
    //         next(err);
    //     }
    // };
    // async cancelOrder  (req, res, next) {
    //     try {
    //         const { id } = req.params;
    //         const order = await orderService.cancelOrder(id);
    //         res.status(200).json(order);
    //     } catch (error) {
    //         next(error);
    //     }
    // };
    async deleteOrder (req, res, next){
        try {
            const { id } = req.params;
            const result = await orderService.deleteOrder(id);
            logger.info(`Order deleted: ${result}`)
            res.status(200).json({result: result});
        } catch (error) {
            logger.error('Error deleting order');
            next(error);
        }
    };

    async getOrdersByDate (req, res, next) {
        try {
            const { date } = req.query; // /order/date?date=YYYY-MM-DD
            if (!date) {
                logger.warn('Date parameter is missing');
                return res.status(400).json({ message: "La fecha es obligatoria" });
            }

            const orders = await orderService.getOrdersByDate(date);

            if (!orders.length > 0) {
                logger.warn(`No orders found for date: ${date}`);
                return res.status(404).json({ message: "No se encontraron órdenes en esa fecha" });
            }
            logger.info(`Orders retrieved for date: ${date}`);
            res.status(200).json({ data: orders });
        } catch (error) {
            logger.error('Error retrieving orders by date');
            next(error)
        }
    };
    async getOrdersByDateRangeAndUser (req, res, next) {
        try {
            const { from, to, userId } = req.query; 
            // Ej: /api/order/date?from=2025-08-01&to=2025-08-10&userId=6792be4274ce1b32dc9c8d10

            if (!from && !to && !userId) {
                return res.status(400).json({ message: "Debe enviar 'from', 'to' o 'userId'" });
            }

            const orders = await orderService.getOrdersByDateRangeAndUser(from, to, userId);

            if (!orders.length) {
                return res.status(404).json({ message: "No se encontraron órdenes con esos criterios" });
            }

            res.status(200).json({ orders });
        } catch (error) {
            next(error)
        }
    };
}
export const orderController = new OrdeController()