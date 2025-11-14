import { daoOrder } from '../dao/dao.order.js';

class OrderRepository {

    async findAll() {
        return await daoOrder.getAllOrders();
    }
    async getOrderById(_id){
        return await daoOrder.getOrderById(_id);
    }
    async getOrderByUser(userId){
        const orders = await daoOrder.getOrderByUserId(userId);
        // Filtra los nulos (si no hay carrito que coincida con el user)
        return orders.filter(order => order.cart !== null);
        // return await daoOrder.getOrderByUser(user);
    }
    async createOrder(data) {
        return await daoOrder.createOrder(data);
    }
    async updateOrderStatus(id, status){
        return await daoOrder.updateOrderStatus(id, status);
    }

    async deleteOrder(id) {
        return await daoOrder.deleteOrder(id);
    }

    async findByDate(date) {
        return await daoOrder.getOrdersByDate(date);
    }
    async findByDateRangeAndUser(from, to, userId) {
        return await daoOrder.getOrdersByDateRangeAndUser(from, to, userId);
    }
};
export const orderRepository = new OrderRepository()
