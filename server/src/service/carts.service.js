import CartDTO from './../dto/cartDto.js';
import { cartRepository } from '../repository/cartRepository.js';
import { prodRepository } from '../repository/prodRepository.js';
import { productService } from './products.service.js';
import { orderService } from './order.service.js';

class CartService {
    // ---------- LECTURAS ----------
    // LEER TODOS
    async readCarts() {
        try {
            const carts = await cartRepository.getAll();
            return carts.map(cart => CartDTO.fromEntity(cart));
        } catch (error) {
            throw new Error('Error al leer los carritos: ' + error.message);
        }
    }
    // // LEER POR ID DE CART
    async readCartsByID(id) {
        try {
            const cart = await cartRepository.getCartById(id);
            if (!cart) throw new Error('Carrito no encontrado');
            return CartDTO.fromEntity(cart);
        } catch (error) {
            throw new Error('Error al leer el carrito: ' + error.message);
        }
    }
    async getCart (userId) {
        try {
            const cart = await cartRepository.getCartByUser(userId);
            console.log('cart: ', cart)
            if (!cart) throw new Error('Carrito no encontrado');
            return CartDTO.fromEntity(cart);
        } catch (error) {
            throw new Error(`Error al obtener el carrito: ${error.message}`);
        }
    }
    // Leer por ID DE USUARIO
    async getCartByUser(userId) {
        try {
            const cart = await cartRepository.getCartByUser(userId);
            if (!cart){
                const createdCart = await cartRepository.createCart(userId);
                return CartDTO.fromEntity(createdCart);
            }
            return CartDTO.fromEntity(cart);
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
            throw new Error("Error al obtener carrito: " + error.message);
        }
    }
    
    async addItemToCart(id, productId, quantity = 1) {
        try{
            const cart = await cartRepository.getCartById(id);
            if (!cart) throw new Error('Carrito no encontrado');
            console.log('ID PRODUCTO:', productId)

            const product = await productService.readProductId(productId);
            console.log('PRODUCTO A AGREGAR:', product)
            
            if (!product) throw new Error('Producto no encontrado');

            if (product.stock === 0) throw new Error('Producto sin stock disponible');

            const itemIndex = cart.products.items.findIndex((i) => i.prod.id.toString() === productId);
            console.log('PRODUCTO itemIndex:', itemIndex)
            
            if (itemIndex > -1) {
                cart.products.items[itemIndex].quantity += quantity;
            } else {
                cart.products.items.push({
                    prod: productId,
                    quantity,
                    subtotal: product.price * quantity
                });
            }
            
            // Actualizar subtotales y total
            cart.products.items.forEach(item => {
                item.subtotal = item.prod.price * item.quantity;
            });

            cart.total = cart.products.items.reduce((sum, item) => sum + item.subtotal, 0);
            cart.updatedAt = new Date();

            const updatedCart = await cartRepository.updateCart(id, cart);

            return CartDTO.fromEntity(updatedCart);
        } catch (error) {
            throw new Error(`Error al agregar producto al carrto: ${error.message}`)
        }
    }
    
    // // Quitar un producto del carrito de un usuario
    async removeProd(id, productId) {
        try{
            const cart = await cartRepository.getCartById(id);
            console.log(`CART: ${cart}`)
            if (!cart) throw new Error('Carrito no encontrado');

            cart.products = cart.products?.items?.filter((i) => i.prod?._id.toString() !== productId);
            cart.total = cart.products?.items?.reduce((sum, item) => sum + item.subtotal, 0);
            cart.updatedAt = new Date();

            const updatedCart = await cartRepository.updateCart(id, cart);
            console.log(`CART ACTUALIZADO: ${updatedCart}`)

            return CartDTO.fromEntity(updatedCart);
        } catch (error){
            throw new Error(`Error al eliminar producto del carrito: ${error.message}`);
        }
        
    }
    
    // Actualizar cantidad de un producto en el carrito
    async updateProductQuantity(id, productId, quantity) {
        try{ 
            // Bucar carrito por ID
            const cart = await cartRepository.getCartById(id);
            if (!cart) throw new Error('Carrito no encontrado');

            // Obtener el producto dentor del carrito
            const product = cart.products.items.findIndex(p => p.prod._id.toString() === productId);
            if (product === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }

            // Aumentar cantidad del producto dentro del carrito y calcular el subtotal 
            cart.products.items[product].quantity += quantity;
            cart.products.items[product].subtotal = cart.products.items[product].prod.price * cart.products.items[product].quantity;

            // Actualizar el total de carrito
            cart.total = cart.products.items.reduce((sum, item) => sum + item.subtotal, 0);
            cart.updatedAt = new Date();

            // Actualziar el carrito
            const updatedCart = await cartRepository.updateCart(id, cart);
            return CartDTO.fromEntity(updatedCart);
        }
        catch (error){
            throw new Error("Error al actualizar producto del carrito: " + error.message);
        }
    }
    async decrementQty(id, productId) {
        try {
            const cart = await cartRepository.getCartById(id);
            if (!cart) throw new Error('Carrito no encontrado');
            
            const itemIndex = cart.products.items.findIndex(i => i.prod._id.toString() === productId);
            
            if (itemIndex === -1) throw new Error('Producto no encontrado en el carrito');
            
            if (cart.products.items[itemIndex].quantity > 1) {
                cart.products.items[itemIndex].quantity -= 1;
                cart.products.items[itemIndex].subtotal = cart.products.items[itemIndex].prod.price * cart.products.items[itemIndex].quantity;
            } else {
                cart.products.splice(itemIndex, 1); // Eliminar el producto si la cantidad es 1
            }
            
            cart.total = cart.products.items.reduce((sum, item) => sum + item.subtotal, 0);
            cart.updatedAt = new Date();
            
            const updatedCart = await cartRepository.updateCart(id, cart);
            return CartDTO.fromEntity(updatedCart);
        } catch (error) {
            throw new Error("Error al disminuir cantidad del producto: " + error.message);
        }
    }
    
    // Vaciar completamente el carrito
    async clearCart(id) {
        try {
            const cart = await cartRepository.getCartById(id);
            if (!cart) throw new Error('Carrito no encontrado o no se pudo limpiar');
            
            cart.products.items = [];
            cart.total = 0;
            cart.updatedAt = new Date()

            const updatedCart = await cartRepository.updateCart(id, cart);
            return CartDTO.fromEntity(updatedCart);
        } catch (error) {
            throw new Error('Error al limpiar el carrito: ' + error.message);
        }
    }

    // --- ELIMINACIÓN ---
    // Eliminar un carrito por su ID
    async delete(id) { 
        try {
            const result = await cartRepository.delete(id);
            if (!result) throw new Error('Carrito no encontrado o no se pudo eliminar');
            
            return CartDTO.fromEntity(result);
        } catch (error) {
            throw new Error('Error al eliminar el carrito: ' + error.message);
        }
    }

    async finalizePurchase(id) {
                
        const cart = await cartRepository.getCartById(id);
        console.log('ID cart', cart)
        if (!cart) throw new Error('Carrito no encontrado');

        if (!cart.products.items.length) {
            throw new Error('El carrito está vacío');
        }
        
        // Validar stock y descontar
        for (const item of cart.products.items) {
            const productId = item.prod._id;
            console.log('product cart', productId)
            const quantityToBuy = item.quantity;
            console.log('quantityToBuy', quantityToBuy)

            const product = await prodRepository.getProdId(productId);
            console.log('product cart', product)
            if (!product) throw new Error(`Producto con ID ${productId} no encontrado`);

            if (product.stock < quantityToBuy) {
                throw new Error(`Sin stock suficiente para el producto: ${product.title}`);
            }

            // Descontar stock
            product.stock -= quantityToBuy;
            await prodRepository.updateProd(productId, product);

        }

        // Crear orden 
        const orderData = {
            cart: cart._id
        };
        console.log('orderData', orderData)

        const newOrder = await orderService.createOrder(orderData);
        console.log('newOrder', newOrder)
        
        // Vaciar carrito para futuras compras
        // cart.products.items = [];
        // cart.total = 0;
        // cart.updatedAt = new Date();
        await cartRepository.updateCart(id, cart);
        
        const clearedCart = await this.clearCart(id);
        return { order: newOrder, cart: clearedCart };
        // await this.clearCart(id)
        // return {order: newOrder}
    }
}
export const cartService = new CartService();

