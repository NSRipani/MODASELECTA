import Cart from "./models/cart.model.js";

class CartDao{    
    // Todos los carritos
    async getAllCart() {
        return await Cart.find()
            .populate('user')
            .populate('products.items.prod', 'productId title price photo stock')
            
    }

    // Leer por ID de carrito
    async getCartById(id) {
        return await Cart.findById(id)
            .populate('user')
            .populate('products.items.prod', 'productId title price photo stock')
            
    }

    // Leer por ID DE USUARIO
    async getCartByUser(userId) {
        return await Cart.findOne({ user: userId })
            .populate('user')
            .populate('products.items.prod', 'productId, title price photo stock')
            
    }

    // ACTULIZAR
    async updateCart(id, data) {
        return await Cart.findByIdAndUpdate(
                id, 
                data, 
                { new: true, runValidators: true }
            )
            .populate('user')
            .populate('products.items.prod', 'productId title price photo stock')
            
    }
    // Eliminar carrito
    async delete(id) {
        return await Cart.findByIdAndDelete(id)
    }
};

export const cartsDao = new CartDao();

