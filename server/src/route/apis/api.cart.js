import { Router } from "express";
import { cartsController } from "../../controllers/carts.controller.js";
import { passportCall } from "../../middleware/passportCall.js";
import checkAuthCookies from "../../auth/checkCookie.js";
import { roleAuth } from './../../middleware/roleUser.js';

const cartsRouter = Router()


cartsRouter.get("/", cartsController.readAll) 
cartsRouter.get("/user/:userId", checkAuthCookies, cartsController.getCart) 
cartsRouter.get("/:id", checkAuthCookies, cartsController.readID) 

cartsRouter.post("/:id", passportCall('current'), roleAuth(['user']), checkAuthCookies, cartsController.addProd) 
cartsRouter.post("/finalize/:id", passportCall('current'), roleAuth(['user']), checkAuthCookies, cartsController.finalizePurchase) 

cartsRouter.patch('/:id/product/:productId/decrease', passportCall('current'), roleAuth(['user']), checkAuthCookies, cartsController.decrementQty);
cartsRouter.patch('/:id/product/:productId', passportCall('current'), roleAuth(['user']), checkAuthCookies, cartsController.updateItemQuantity);

cartsRouter.delete("/:id/items/:productId", passportCall('current'), roleAuth(['user']), checkAuthCookies, cartsController.removeProductFromCart) 
cartsRouter.delete("/:id/clear", passportCall('current'), roleAuth(['user']), checkAuthCookies, cartsController.clearCart) 
cartsRouter.delete("/:id", cartsController.deleteByID) 


export default cartsRouter