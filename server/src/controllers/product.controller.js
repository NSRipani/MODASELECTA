import { productService } from '../service/products.service.js';
import logger from '../utils/logger.js';

class ProductController {

    async readAll(req, res, next) {
        try {
            const response = await productService.readProd()
            if (!response.length > 0) {
                logger.warn('No products found in the database');
                return res.status(404).json({ message: "PRODUCTS NOT FOUND"});
            } 
            res.status(200).json({ message: "PRODUCTS READ", response });
            logger.info('All products retrieved successfully');
        } catch (error) {
            logger.error('Error retrieving all products');
            next(error);
        }
    }

    async readIdProduct(req, res, next) {
        try {
            const { id } = req.params
            const response = await productService.readProductId(id);
            if (response) {
                logger.info(`Product with ID ${response.id} retrieved successfully`);
                return res.status(200).json({ message: "PRODUCT READ", response });
            }
            logger.warn(`No product found with ID ${id}`);
            res.status(404).json({ message: "PRODUCTS NOT FOUND" });
        } catch (error) {
            logger.error(`Error retrieving product with ID ${id}`);
            next(error);
        }
    }

    async readCategory(req, res, next) {
        try {
            const { category } = req.query;
            const products = await productService.findByCategory(category)
            if (!products.length > 0) {
                logger.warn(`No products found in category ${category}`);
                return res.status(404).json({ message: "Products not found" });
            }
            logger.info(`Products in category ${category} retrieved successfully`);
            res.status(200).json({ message: 'Products found', products: products });
        } catch (error) {
            logger.error('Error retrieving products in category ');
            next(error);
        }
    }

    async getOutstandingProducts (req, res, next) {
        try {
            const outstanding = await productService.getOutstanding(5); // puedes usar req.query.limit si querés
            res.status(200).json({ products: outstanding });
            logger.info('Outstanding products retrieved successfully');
            if (!outstanding) {
                logger.warn('No outstanding products found');
                return res.status(500).json({ message: "Error al obtener productos destacados", error });
            }
        } catch (error) {
            logger.error('Error retrieving outstanding products');
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const file = req.file?.filename;
            if (!file) {
                logger.warn('No image uploaded for new product');
                return res.status(400).json({ message: "No se ha subido ninguna imagen" });
            }
            // const data = {...req.body, photo: `http://localhost:8000/assets/${file}`};
            const response = await productService.create(req.body);
            logger.info(`ProdObj: ${response}`)
            logger.info('New product created successfully');
            res.status(201).json({ message: "PRODUCT CREATED", response });
        } catch (error) {
            logger.error('Error creating new product');
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            // if (!id || typeof id !== 'string' || id.length < 8) {
            //     return res.status(400).json({ message: "ID de producto inválido." });
            // }
            const data = req.body;
            const response = await productService.update(id, data);
            if (response) {
                logger.info(`Product with ID ${id} updated successfully`);
                return res.status(200).json({ message: "PRODUCT UPDATED", response });
            }
            logger.warn(`No product found with ID ${id} to update`);
            return res.status(404).json({ message: "PRODUCT NOT FOUND" });
        } catch (error) {
            logger.error('Error updating product with ID');
            next(error);
        }
    }

    async updateProductStock (req, res, next) {
        try {
            const { id } = req.params;
            const { stock } = req.body;

            if (typeof stock !== 'number') {
                logger.warn('Invalid stock value provided');
                return res.status(400).json({ message: "Stock debe ser un número." });
            }

            const updated = await productService.updateStock(id, stock);
            logger.info(`Stock for product ID ${id} updated to ${stock}`);
            res.status(200).json(updated);
        } catch (error) {
            logger.error('Error updating product stock');
            next(error);
        }
    };
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const response = await productService.delete(id);
            if (response) {
                logger.info(`Product with ID ${id} deleted successfully`);
                return res.status(200).json({ message: "PRODUCT DELETED", response });
            }
            logger.warn(`No product found with ID ${id} to delete`);
            return res.status(404).json({ message: "PRODUCT NOT FOUND", response });
            
        } catch (error) {
            logger.error('Error deleting product with ID ');
            next(error);
        }
    }

    async getPaginatedProductsCtrl(req, res, next) {
        try {
            const { page, limit, sort, category, minPrice, maxPrice } = req.query;

            const data = await productService.getPaginatedProducts({ page, limit, sort, category, minPrice, maxPrice });
            logger.info('Paginated products retrieved successfully');
            res.status(200).json({
                status: "success",
                payload: data.docs,
                totalPages: data.totalPages,
                prevPage: data.prevPage,
                nextPage: data.nextPage,
                currentPage: data.page,
                hasPrevPage: data.hasPrevPage,
                hasNextPage: data.hasNextPage,
                prevLink: data.hasPrevPage ? `/products?page=${data.prevPage}` : null,
                nextLink: data.hasNextPage ? `/products?page=${data.nextPage}` : null,
            });
        } catch (error) {
            logger.error('Error retrieving paginated products');
            next(error);
        }
    };

    async createMockProducts(req, res, next) {
        try {
            const { count } = req.query;
            const created = await productService.createMockProducts(Number(count) || 10);
            res.status(201).json({ 
                message: `${created.length} productos de prueba creados correctamente `,
                products: created,
            });
            logger.info(`${created.length} productos de prueba creados correctamente`)
        } catch (error) {
            next(error);
        }
    }
}

const productController = new ProductController();
export default productController;