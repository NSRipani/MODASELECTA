import { Schema, model } from "mongoose";
import  mongoosePaginate from 'mongoose-paginate-v2'


// const collection = "products";
// const schema = new Schema({
//     title: { type: String },
//     photo: { type: String },
//     category: { type: String },
//     price: { type: Number } ,
//     stock: { type: Number,  min: 0 },
//     createdAt: { type: Date, default: Date.now }
// });

// schema.plugin(mongoosePaginate)

// const Product = model(collection, schema);
// export default Product;

const collection = "products"
const product = new Schema({

    // 📌 Identidad
    title: { type: String, required: true, trim: true, index: true },
    slug: { type: String, unique: true, lowercase: true, index: true },
    description: { type: String, trim: true },

    // 💲 Precios
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, min: 0, max: 100, default: 0 },
    finalPrice: { type: Number, min: 0 },

    // 📦 Stock
    stock: { type: Number, required: true, min: 0 },

    // 🗂️ Clasificación
    category: { type: String, index: true },
    brand: { type: String, index: true },
    tags: { type: [String], index: true },

    // 🖼️ Media
    images: { type: [String], default: [] },

    // ⭐ Métricas
    rating: { type: Number, default: 0, min: 0, max: 5 },
    sold: { type: Number, default: 0, min: 0 },

    // 🧭 Estados
    active: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },

    // 🧠 SEO
    seo: { title: String, description: String, keywords: [String] },

    // 👮 Auditoría
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "users" }

    }, {
        timestamps: true
    }
);
product.plugin(mongoosePaginate)

const Product = model(collection, product);
export default Product;