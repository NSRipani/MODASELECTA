import { cartsDao } from "../dao/dao.carts.js";

class CartRepository {
    // Todos los carritos
    async getAll(){
        return await cartsDao.getAllCart();
    };
    // Leer por ID de carrito
    async getCartById (id) {
        return await cartsDao.getCartById(id);
    };
    
    // LEER por ID DE USUARIO
    async getCartByUser(userId) {
        return await cartsDao.getCartByUser(userId);
    }

    // CREAR por ID DE USUARIO
    async createCart(userId) {
        return await cartsDao.register(userId);
    }

    // ACTUALIZAR CARRITO
    async updateCart (id, data) {
        return await cartsDao.updateCart(id, data);
    };
    
    // Eliminar carrito
    async delete (id) {
        return await cartsDao.delete(id);
    };
}
export const cartRepository = new CartRepository();