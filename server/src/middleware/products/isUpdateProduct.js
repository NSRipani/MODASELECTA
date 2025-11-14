import Joi from 'joi';

// Mensajes personalizados reutilizables
const messages = {
    stringBase: 'El campo {#label} debe ser un texto.',
    required: 'El campo {#label} es obligatorio.',
    pattern: 'El campo {#label} solo puede contener letras y espacios.',
    numberBase: 'El campo {#label} debe ser un número.',
    integer: 'El campo {#label} debe ser un número entero.',
    uri: 'El campo {#label} debe ser una URL válida.',
    valid: 'El campo {#label} debe ser uno de los valores permitidos: {#valids}.'
};

export const updateProductSchema = Joi.object({
    title: Joi.string().pattern(/^[a-zA-Z\s]+$/).messages({
        'string.base': messages.stringBase,
        'string.empty': messages.required,
        'string.pattern.base': messages.pattern
    }).label('Título'),
    photo: Joi.string().uri().messages({
        'string.base': messages.stringBase,
        'string.empty': messages.required,
        'string.uri': messages.uri
    }).label('Foto'),
    category: Joi.string().valid('Abrigos', 'Articulo', 'Zapatos', 'Zapatillas').messages({
        'string.base': messages.stringBase,
        'string.empty': messages.required,
        'any.only': messages.valid
    }).label('Categoría'),

    price: Joi.number().integer().positive().messages({
        'number.base': messages.numberBase,
        'number.empty': messages.required,
        'number.integer': messages.integer
    }).label('Precio'),

    stock: Joi.number().integer().positive().messages({
        'number.base': messages.numberBase,
        'number.empty': messages.required,
        'number.integer': messages.integer,
    }).label('Stock')
})
// .options({ abortEarly: false, stripUnknown: true });

// 🔹 Esquema para actualización parcial (PATCH)
export const productSchema = updateProductSchema.fork(
    Object.keys(updateProductSchema.describe().keys),
    (field) => field.optional()
);

// 🔹 Middleware genérico reutilizable
export const updateProduc = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        const errors = error.details.map((err) => ({
        field: err.context.label,
        message: err.message,
        }));
        return res.status(400).json({ errors });
    }

    req.body = value;
    next();
};

// // 🔹 Middleware dinámico para validación
// export const updateProduc = (schema) => (req, res, next) => {
//     try {
//         const { error, value } = schema.validate(req.body, {
//             abortEarly: false,
//             stripUnknown: true
//         });
//         if (error) {
//             const errorDetails = error.details.map(err => ({
//                 field: err.context.label,
//                 message: err.message
//             }));
//             return res.status(400).json({ errors: errorDetails });
//         }
//         req.body = value; // Actualizamos el cuerpo con los valores validados y limpios
//         next();
//     } catch (err) {
//         console.error('Error en middleware de validación de producto:', err);
//         next(err);
//         // return res.status(500).json({ message: 'Error interno en la validación del producto.' });
//     }
// };
