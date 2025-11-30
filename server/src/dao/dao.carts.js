import Cart from "./models/cart.model.js";

class CartDao{    
    // Todos los carritos
    async getAllCart() {
        return await Cart.find()
            .populate('products.items.prod')
            .exec();
    }

    // Leer por ID de carrito
    async getCartById(id) {
        return await Cart.findById(id)
            .populate('products.items.prod')
            .exec();
    }

    // Leer por ID DE USUARIO
    async getCartByUser(userId) {
        return await Cart.findOne({ user: userId })
            .populate('products.items.prod')
            .populate('user')
            .exec();
    }

    // ACTULIZAR
    async updateCart(id, data) {
        return await Cart.findByIdAndUpdate(
                id, 
                data, 
                { new: true, runValidators: true }
            )
    }
    // Eliminar carrito
    async delete(id) {
        return await Cart.findByIdAndDelete(id)
    }
};

export const cartsDao = new CartDao();

