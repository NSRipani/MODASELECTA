import { orderRepository } from '../repository/orderRepository.js'
import logger from '../utils/logger.js';
import OrderDTO from './../dto/orderDto.js';

class OrderService {
    async createOrder(data) {
        
        const newOrder = await orderRepository.createOrder(data);
        console.log('order: ', newOrder)
        return OrderDTO.fromEntity(newOrder);
    }

    async getAllOrders() {
        const orders = await orderRepository.findAll();
        if (!orders) throw new Error('Orders not found')
        return orders.map(order => OrderDTO.fromEntity(order));
    } 
    
    async getOrderById(id) {
        const order = await orderRepository.getOrderById(id);
        logger.info(`order id: ${order._id}`)
        if (!order) throw new Error(`Order with ID: ${id} not found`);
        return OrderDTO.fromEntity(order);
    }

    async getOrdersByUser(userId) {
        const orders = await orderRepository.getOrderByUser(userId);
        logger.info(`orders by user(servicio): ${orders}`)
        if (!orders) throw new Error(`User order with ${orders.userId} not found`);
        return orders.map(order => OrderDTO.fromEntity(order));
    }
    async updateOrderStatus(id, status) {
        const updatedOrder = await orderRepository.updateOrderStatus(id, status);
        if (!updatedOrder) throw new Error('State of the order not updated');
        return OrderDTO.fromEntity(updatedOrder);
    }

    // async markAsPending(id) {
    //     const updated = await orderRepository.updateOrderStatus(id, 'pendiente');
    //     return OrderDTO.fromEntity(updated);
    // }

    // async markAsProcessing(id) {
    //     const updated = await orderRepository.updateOrderStatus(id, 'procesando');
    //     return OrderDTO.fromEntity(updated);
    // }

    // async markAsShipped(id) {
    //     const updated = await orderRepository.updateOrderStatus(id, 'enviada');
    //     return OrderDTO.fromEntity(updated);
    // }

    // async markAsDelivered(id) {
    //     const updated = await orderRepository.updateOrderStatus(id, 'entregada');
    //     return OrderDTO.fromEntity(updated);
    // }

    // async markAsReturned(id) {
    //     const updated = await orderRepository.updateOrderStatus(id, 'devuelta');
    //     return OrderDTO.fromEntity(updated);
    // }


    async deleteOrder(id) {
        const result = await orderRepository.deleteOrder(id);
        if (!result) throw new Error('Orden no encontrada');
        return OrderDTO.fromEntity(result);
    }

    async getOrdersByDate(date) {
        if (!date) throw new Error("Se requiere una fecha para la búsqueda");

        const orders = await orderRepository.findByDate(date);
        return OrderDTO.fromEntity(orders);
    }

    async getOrdersByDateRangeAndUser(from, to, userId) {
        if (!from && !to && !userId) {
            throw new Error("Debe proporcionar al menos una fecha o un usuario");
        }

        return await orderRepository.findByDateRangeAndUser(from, to, userId);
    }
}
export const orderService = new OrderService()
