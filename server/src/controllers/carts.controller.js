import { cartService } from '../service/carts.service.js';
import logger from '../utils/logger.js';

class CartController {
    // TODOS LOS CARRITOS
    async readAll(req, res, next) {
        try {
            const response = await cartService.readCarts();
            logger.info(`READ ALL CARTs: ${response}`)
            if (!response) {
                logger.warn('No carts found in the database');
                res.status(404).json({ message: "CARTS NOT FOUND" });
            }
            logger.info('All carts retrieved successfully');
            res.status(200).json({ message: "CARTS READ", cart: response });
        } catch (error) {
            logger.error('Error retrieving all carts');
            next(error);
        }
    }
    async readID(req, res, next) {
        try {
            const { id } = req.params;
            const response = await cartService.readCartsByID(id);
            if (!response) {
                logger.warn(`No cart found with ID ${id}`);
                res.status(404).json({ message: "CART NOT FOUND" });
            }
            logger.info(`Cart with ID ${id} retrieved successfully`);
            res.status(200).json({ message: "CART READ", cart: response });
        } catch (error) {
            logger.error('Error retrieving cart by ID');
            next(error);
        }
    }
    
    // LEER POR ID DEL USUARIO
    async getCart(req, res, next) {
        try {
            const userId = req.user?.id;
            const cart = await cartService.getCart(userId);
            logger.info(`Cart for user ID '${userId}' retrieved successfully`);
            res.status(200).json({ success: 'Carrito encontrado', cart: cart });
        } catch (error) {
            logger.error('Error retrieving cart for user');
            next(error);
        }
    }

    // Agregar producto al carrito de un usuario
    async addProd(req, res, next) { 
        try {
            const { id } = req.params;
            const { productId, quantity }  = req.body;
            
            const add = await cartService.addItemToCart(id, productId, quantity);
            if (!add) {
                logger.warn('productId is required to add a product to the cart');
                res.status(400).json({ message: "productId es requerido" })
            }
            logger.info(`Product ID ${productId} added to cart ID ${id} successfully`);

            res.status(200).json({ success: "Added product", payload: add });
        } catch (error) {
            logger.error('Error adding product to cart');
            return next(error);
        }
    };

    // Eliminar producto del carrito
    async removeProductFromCart(req, res, next) {
        try {
            const { id, productId } = req.params;
            const result = await cartService.removeProd(id, productId);
            console.log(`RESULT: ${result}`)
            logger.info(`Product ID '${productId}' removed from cart ID '${id}' successfully`);
            res.status(200).json(result);
        } catch (error) {
            logger.error('Error removing product from cart');
            next(error)
        }
    };

    async updateItemQuantity(req, res, next) {
        try {
            const { id, productId } = req.params;
            const { quantity } = req.body;
            
            const response = await cartService.updateProductQuantity(id, productId, quantity );
            if (!response) {
                logger.warn(`No cart found with ID ${id}`);
                res.status(404).json({ message: "CART NOT FOUND" });
            }
            logger.info(`Quantity for product ID ${productId} in cart ID ${id} updated successfully`);
            res.status(200).json({ message: "CART UPDATED", payload: response });
            
        } catch (error) {
            logger.error('Error updating item quantity in cart');
            next(error);
        }
    }
    async decrementQty(req, res, next) {
        try {
            const { id, productId } = req.params;
            const response = await cartService.decrementQty(id, productId);
            if (!response) {
                logger.warn(`No cart found with ID ${id}`);
                res.status(404).json({ message: "CART NOT FOUND" });
            }
            logger.info(`Quantity for product ID ${productId} in cart ID ${id} decremented successfully`);
            res.status(200).json({ message: "CART UPDATED", payload: response });
        } catch (error) {
            logger.error('Error decrementing item quantity in cart');
            next(error);
        }
    }

    // Limpiar carrito
    async clearCart(req, res, next) { // ok
        try {
            const { id } = req.params;
            const clearedCart = await cartService.clearCart(id);
            logger.info(`Cart ID ${id} cleared successfully`);
            res.status(200).json({ success: 'Carrito vacio', payload: clearedCart });
        } catch (error) {
            next(error);
        }
    };

    // Eliminar carrito por ID
    async deleteByID(req, res, next) {
        try {
            const { id } = req.params;
            const response = await cartService.delete(id);
            if (!response) {
                logger.warn(`No cart found with ID ${id} to delete`);
                res.status(404).json({ message: "CART NOT FOUND", response: response }); 
            }
            logger.info(`Cart with ID ${id} deleted successfully`);
            res.status(200).json({ message: "CART DELETED BY ID", response: response });
        } catch (error) {
            logger.error('Error deleting cart by ID');
            next(error);
        }
    }

    async finalizePurchase(req, res, next) {
        try {
            const { id } = req.params;

            const result = await cartService.finalizePurchase(id);
            console.log(`RESULT: order: ${result}`)

            logger.info(`Purchase finalized for cart ID ${id} successfully`);
            res.status(200).json({ message: 'Compra finalizada correctamente', order: result.order, cart: result.cart });
        } catch (error) {
            logger.error('Error finalizing purchase');
            next(error);
        }
    };
}

export const cartsController = new CartController();
