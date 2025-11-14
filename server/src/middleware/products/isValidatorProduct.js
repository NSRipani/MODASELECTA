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

// 🔹 Esquema para **CREAR** producto (todos los campos requeridos)
export const createProductSchema = Joi.object({
    title: Joi.string().pattern(/^[a-zA-Z\s]+$/).required().messages({
        'string.base': messages.stringBase,
        'string.empty': messages.required,
        'string.pattern.base': messages.pattern
    }).label('Título'),
    photo: Joi.string().uri().required().messages({
        'string.base': messages.stringBase,
        'string.empty': messages.required,
        'string.uri': messages.uri
    }).label('Foto'),
    category: Joi.string().valid('Abrigos', 'Articulo', 'Zapatos', 'Zapatillas').required().messages({
        // 'string.base': messages.stringBase,
        'any.only': messages.valid
    }).label('Categoría'),

    price: Joi.number().integer().positive().required().messages({
        'number.base': messages.numberBase,
        'number.empty': messages.required,
        'number.integer': messages.integer
    }).label('Precio'),

    stock: Joi.number().integer().positive().required().messages({
        'number.base': messages.numberBase,
        'number.empty': messages.required,
        'number.integer': messages.integer,
    }).label('Stock')
}).options({ abortEarly: false, stripUnknown: true });


// 🔹 Middleware dinámico para validación
export const validarProduct = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        const errorDetails = error.details.map(err => ({
            field: err.context.label,
            message: err.message
        }));
        console.log(error);
        return res.status(400).json({ errors: errorDetails });
    }
    req.body = value; // Actualizamos el cuerpo con los valores validados y limpios
    next();
};
