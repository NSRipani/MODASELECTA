import Product from "./models/products.model.js";

class ProductDao {
    
    getAll = async () => {
        return await Product.find();
    }
    readOne = async (prodID) => {
        return await Product.findOne({prod: prodID})
    }

    getID = async (id) => {
        return await Product.findById(id);
    }

    getCategory = async (category) => {
        return await Product.find({category: category});
    };

    findOutstanding = async (limit = 10) => {
        return await Product.find().limit(limit);
    }

    create = async (data) => {
        return await Product.create(data);
    }

    paginate = async (filter, opts) => {
        try {
            opts.lean = true
            const all = await Product.paginate(filter, opts)
            return all
        } catch (error) {
            throw error
        }
    }

    update = async (id, data) => {
        return await Product.findByIdAndUpdate( id, data, { new: true } );
    }
    // Solo actualiza los campos presentes en 'data'.
        // try {
        //     const updated = await Product.findByIdAndUpdate(
        //         id,
        //         { $set: data },
        //         { new: true, runValidators: true }
        //     );
        //     return updated;
        // } catch (error) {
        //     throw new Error('Error al actualizar el producto: ' + error.message);
        // }
    
    updateStock = async (id, newStock) => {
        return await Product.findByIdAndUpdate(
            id,
            { stock: newStock },
            { new: true }
        );
    }
    delete = async (id) => {
        try {
            return await Product.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error al eliminar el producto: ' + error.message);
        }
    }
    async insertMany(products) {
        return await Product.insertMany(products);
    }
};
export const productDao = new ProductDao();


