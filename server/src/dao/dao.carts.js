import Cart from "./models/cart.model.js";

class CartDao{    
    // Todos los carritos
    async getAllCart() {
        return await Cart.find()
            .populate('user').populate('products.items.prod') 
            // .populate({ path: 'user', select: '_id first_name last_name email age role' })
            // .populate({ path: 'products.items.prod', model: 'carts', select: 'productId name photo price stock quantity subtotal'  })
            // .exec();
    }

    // Leer por ID de carrito
    async getCartById(id) {
        return await Cart.findById(id)
            .populate('user').populate('products.items.prod')           
            // .populate({ path: 'user', select: '_id first_name last_name email age role' })
            // .populate({ path: 'products.items.prod', model: 'carts', select: 'productId name photo price stock quantity subtotal' })
            // .exec();
    }

    // Leer por ID DE USUARIO
    async getCartByUser(userId) {
        return await Cart.findOne({ user: userId })
            .populate('user').populate('products.items.prod') 
            // .populate({ path: 'user', select: '_id first_name last_name email age role' })
            // .populate({ path: 'products.items.prod', model: 'carts', select: 'productId name photo price stock quantity subtotal' })
            // .exec();
    }
    // async register(userId) {
    //     return await Cart.create({user: userId, products: [{}], total: 0})
    // }

    // ACTULIZAR
    async updateCart(id, data) {
        return await Cart.findByIdAndUpdate(
            id, 
            data, 
            { new: true, runValidators: true }
        )
        // .populate({ path: 'user', select: '_id first_name last_name email age role' })
        // .populate({ path: 'products.items.prod', model: 'carts', select: 'productId title photo price stock quantity subtotal' })
        // .exec();
    }
    // Eliminar carrito
    async delete(id) {
        return await Cart.findByIdAndDelete(id)
    }
};

export const cartsDao = new CartDao();

    // async aggregation(cid) {
    //     return await Cart.aggregate([
    //         { $match: { _id: cid } },
    //         { $unwind: "$products" },
    //         {
    //             $lookup: {
    //                 from: "products",
    //                 localField: "products.prod",
    //                 foreignField: "_id",
    //                 as: "productDetails"
    //             }
    //         },
    //         { $unwind: "$productDetails" },
    //         {
    //             $group: {
    //                 _id: "$_id",
    //                 totalPrice: { $sum: { $multiply: ["$products.quantity", "$productDetails.price"] } },
    //                 products: { $push: "$products" }
    //             }
    //         }
    //     ]);
    // }
