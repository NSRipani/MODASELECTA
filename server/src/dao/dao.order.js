import Order from './models/order.model.js'

class OrderDAO {
    async createOrder(data) {
        return await Order.create(data)
        
    }

    async getAllOrders() {
        return await Order.find().populate('cart').lean()
            // .populate(
            //     {
            //     path: 'cart',
            //     populate: [
                //     { path: 'user', model: 'carts', select: '_id first_name last_name email age role' },
                //     { path: 'products.items.prod',  model: 'carts', select: 'productId title photo price quantity subtotal' }
                // ]
            // })
    }

    async getOrderById(id) {
        return await Order.findById(id).populate('cart').lean()
        // .populate({
        //     path: 'cart',
        //     populate: [
        //         { path: 'user', model: 'carts', select: '_id first_name last_name email age role' },
        //         { path: 'products.items.prod',  model: 'carts', select: 'productId title photo price quantity subtotal' }
        //     ]
        // }).exec();
    }

    async getOrderByUser(userId) {
        return await Order.findOne(  )//.populate('cart')
            .populate({
                path: 'cart',
                match: { user: userId },
                populate: { path: 'user', select: 'first_name last_name email' }
            })
            .exec();
        // }).exec()
        // return await Order.find({ user: userId }).populate('cart').exec();
    }


    async updateOrderStatus(id, status) {
        return await Order.findByIdAndUpdate( id, { status }, { new: true, runValidators: true }).exec();
    }

    async deleteOrder(id) {
        return await Order.findByIdAndDelete(id).exec();
    }

    async getOrdersByDate(date) {
        // buscamos en createdAt ignorando la hora
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(end.getDate() + 1);

        return await Order.find({
            createdAt: { $gte: start, $lt: end }
        }).populate("cart").exec();
    }
    
    async getOrdersByDateRangeAndUser(from, to, userId) {
        let filter = {};

        // Rango de fechas
        if (from && to) {
            filter.createdAt = {
                $gte: new Date(from),
                $lt: new Date(new Date(to).setDate(new Date(to).getDate() + 1))
            };
        } else if (from) {
            const start = new Date(from);
            const end = new Date(from);
            end.setDate(end.getDate() + 1);

            filter.createdAt = { $gte: start, $lt: end };
        } else if (to) {
            const end = new Date(to);
            end.setDate(end.getDate() + 1);

            filter.createdAt = { $lt: end };
        }

        // Filtrar por usuario si se manda
        if (userId) {
            filter["cart.user"] = userId;
        }

        return await Order.find(filter).populate("cart");
    }

}

export const daoOrder = new OrderDAO()
