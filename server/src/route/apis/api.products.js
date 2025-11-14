import { Router } from "express";
import productController from './../../controllers/product.controller.js';
import { createProductSchema, validarProduct } from '../../middleware/products/isValidatorProduct.js';
import uploader from './../../utils/multer.js';
import { updateProduc, productSchema } from './../../middleware/products/isUpdateProduct.js';
import { incluirFotoEnBody } from "../../middleware/products/includePhoto.js";
import { passportCall } from "../../middleware/passportCall.js";
import { roleAuth } from "../../middleware/roleUser.js";
import checkAuthCookies from "../../auth/checkCookie.js";

const prodRouter = Router()

// Ruta de paginación
prodRouter.get("/",  passportCall("current"), checkAuthCookies, productController.readAll) // FUNCIONA
prodRouter.get("/paginate", productController.getPaginatedProductsCtrl); // FUNCIONA
prodRouter.get("/outstanding",  productController.getOutstandingProducts) // FUNCIONA
prodRouter.get("/filter", passportCall("current"), roleAuth(['admin']), checkAuthCookies, productController.readCategory) // FUNCIONA 
prodRouter.get("/:id",  productController.readIdProduct) // Falta de implementar

prodRouter.post("/create", passportCall("current"), roleAuth(['admin']), checkAuthCookies, uploader.single('photo'), incluirFotoEnBody, validarProduct(createProductSchema), productController.create) // FUNCIONA
prodRouter.post('/mocks', uploader.single('photo'), incluirFotoEnBody, productController.createMockProducts);
// Actualización parcial de producto por ID
// PATCH /api/products/:id
// Body: { campo1: valor1, campo2: valor2, ... }
// Solo los campos enviados serán actualizados
prodRouter.patch("/:id", passportCall("current"), roleAuth(['admin']), checkAuthCookies, updateProduc(productSchema), productController.update)
prodRouter.patch('/:id/stock', passportCall("current"), roleAuth(['admin']), checkAuthCookies, productController.updateProductStock);
prodRouter.delete("/:id", passportCall("current"), roleAuth(['admin']), checkAuthCookies, productController.delete)

export default prodRouter;
