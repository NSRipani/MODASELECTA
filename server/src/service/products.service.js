import { generateMockProducts } from "../mocks/product.mocks.js";
import { prodRepository } from "../repository/prodRepository.js";
import ProductDTO from './../dto/prodDto.js'

class ProductService {

    readProd = async () => {
        try {
            const prod = await prodRepository.getProd();
            if (!prod?.length === 0) throw new Error("No products found");
            // return new ProductDTO(prod);
            return prod.map(product => ProductDTO.productDTO(product));
        } catch (error) {
            throw new Error(`Error reading products: ${error.message}`);
        }
    };

    readProductId = async (id) => {
        try {
            const prodId = await prodRepository.getProdId(id)
            if (!prodId) throw new Error("Product not found");

            return ProductDTO.productDTO(prodId);
        } catch (error) {
            throw new Error(`Error reading product: ${error.message}`);
        }
    };

    findByCategory = async (category) => {
        try {
            const response = await prodRepository.getProdCategoty(category);
            if (!response?.length === 0) throw new Error(`No results for category: ${category}`);
            
            return response.map(prod => ProductDTO.productDTO(prod));
        } catch (error) {
            throw new Error(`Error finding products by category: ${error.message}`);
        }
    };

    getOutstanding = async (limit = 10) => {
        try {
            const outstandingProducts = await prodRepository.getOutstandingProducts(limit);
            if (!outstandingProducts?.length === 0) throw new Error(`No results for category: ${category}`);
            return outstandingProducts.map(prod => ProductDTO.productDTO(prod));    
        } catch (error) {
            throw new Error(`Error finding products outstanding: ${error.message}`);
        }
    }
    
    create = async (data) => {
        try {
            const product = await prodRepository.createProd(data);
            if (!product) throw new Error("Product not created");
            
            return ProductDTO.productDTO(product);
        
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    };

    update = async (id, data) => {
        try {
            const updateProd = await prodRepository.updateProd(id, data);
            if (!updateProd) throw new Error("Produt not found");
            
            return ProductDTO.productDTO(updateProd);
        
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    };
    
    updateStock = async(id, newStock) => {
        try {
            const updatedProduct = await prodRepository.updateStock(id, newStock);
            if (!updatedProduct) throw new Error("Error al actualizar stock");
            return ProductDTO.productDTO(updatedProduct);
        } catch (error) {
            throw new Error(`Error al actualizar stock: ${error.message}`);
        }
    }

    delete = async (id) => {
        try {
            if (!id) throw new Error("Product ID is required");
            
            const deletedProduct = await prodRepository.deleteProd(id);
            if (!deletedProduct) throw new Error("Product not found");
            
            return ProductDTO.productDTO(deletedProduct);
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    };
    getPaginatedProducts = async ({ page = 1, limit = 12, sort = null, category = null, minPrice = null, maxPrice = null}) => {
        try {
            const filter = {};

            if (category) filter.category = category;
            if (minPrice || maxPrice) {
                filter.price = {};
                if (minPrice) filter.price.$gte = parseFloat(minPrice);
                if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
            }
            
            const options = {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
            };

            const result = await prodRepository.paginateProd(filter, options);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener productos paginados: ${error.message}`);
        }
    };
    createMockProducts = async (count = 10) => {
        const mockProducts = generateMockProducts(count);
        const inserted = await prodRepository.createMockProducts(mockProducts);
        return inserted.map(prod => ProductDTO.productDTO(prod));
    }
}
export const productService = new ProductService();