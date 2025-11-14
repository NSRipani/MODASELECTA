import { Types } from "mongoose";
import Cart from "./models/cart.model.js";

class MongoDao {
    // Crear usuario
    create = async (data) => {
        try {
            const one = await Cart.create(data);
            return one;
        } catch (error) {
            throw error;
        }
    };
    // Leer todos los usuarios
    find = async () => {
        try {
            const all = await Cart.find()
            return all;
        } catch (error) {
            throw error;
        }
    };
    
    async paginate(filter = {}, options = {}) {
        try {
            const result = await Cart.paginate(filter, options);
            return result;
        } catch (error) {
            throw new Error(`Error en la paginación: ${error.message}`);
        }
    }
    
    // Leer para categoria
    findByCategory = async (category) => {
        try {
            const all = await Cart.find({category: category})
            return all;
        } catch (error) {
            throw error;
        }
    };

    // Leer por ID
    findById = async (id) => {
        try {
            const one = await Cart.findOne({ _id: id });
            return one;
        } catch (error) {
            throw error;
        }
    };
    // Encontrar usuario por email
    findByEmail = async (email) => {
        try {
            return await Cart.findOne({ email: email });
        } catch (error) {
            throw new Error(`Error buscando usuario por email: ${error.message}`);
        }
    }
    // Encontrar role del usuario 
    findByRole = async (role) => {
        try {
            return await Cart.find({ role: role });
        } catch (error) {
            throw new Error(`Error buscando usuario por email: ${error.message}`);
        }
    }
    // Actualizar por ID
    update = async (id, data) => {
        try {
            const opts = { new: true };
            //para devolver el objeto luego de la modifiacion
            const one = await Cart.findOneAndUpdate({ _id: id } , data, opts);
            return one;
        } catch (error) {
            throw error;
        }
    };
    
    // Eliminar por ID
    delete = async (id) => {
        try {
            const one = await Cart.findOneAndDelete({ _id: id });
            return one;
        } catch (error) {
            throw error;
        }
    };
    aggregation = async (id) => {
        try {
            const detalle = await Cart.aggregate([
                { $match: { user_id: new Types.ObjectId(id) }},
                { $lookup: {
                    foreignField: "_id",
                    from: "products" ,
                    localField: "product_id" ,
                    as: "product_id" ,
                    }
                },
                { $replaceRoot: { 
                    newRoot: { 
                        $mergeObjects: [{ 
                            $arrayElemAt: ["$product_id" , 0] }, "$$ROOT" ]
                }}},
                { $set: { subTotal: { $multiply: ["$quantity" , "$price" ] } } },
                { $group: { _id: "$user_id" , total: { $sum: "$subTotal" } } },
                { $project: { _id: 0, user_id: "$_id", total: "$total" , date: new Date() } },
                { $lookup: {
                    foreignField: "_id",
                    from: "users",
                    localField: "user_id",
                    as: "user_id" 
                }},
                    // 8 $replaceRoot para mergear el objeto con el objeto cero del array populado
                { $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                        { $arrayElemAt: ["$user_id", 0] },
                        "$$ROOT"
                        ]
                    }
                }},
                // 9 $project para limpiar el objeto
                { $project: { _id: 0, user_id: 0, first_name: 0, last_name: 0, password: 0, age: 0, role: 0, __v: 0 }},
            ])
            return detalle

        } catch (error) {
            throw error
        } 
    }
}

export default MongoDao;
