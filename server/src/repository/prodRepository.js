import { productDao } from "./../dao/dao.product.js";

class ProdRepository {
    async getProd() {
        return await productDao.getAll()
    }

    async getProdId(id) {
        return await productDao.getID(id);
    }
    async getReadOne(prodID){
        return await productDao.readOne(prodID)
    }
    async getProdCategoty(category) {
        return await productDao.getCategory(category);
    }

    async getOutstandingProducts(limit) {
        return await productDao.findOutstanding(limit);
    }

    async createProd(Prod) {
        return await productDao.create(Prod);
    }

    async updateProd(id, data) {
        return await productDao.update(id, data);
    }
    
    async updateStock(id, newStock) {
        return await productDao.updateStock(id, newStock);
    }
    
    async deleteProd(id) {
        return await productDao.delete(id);
    }
    async paginateProd(filter, options){
        return await productDao.paginate(filter, options)
    }
    async createMockProducts(products) {
        return await productDao.insertMany(products);
    }
}

export const prodRepository = new ProdRepository();