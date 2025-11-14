import Joi from 'joi';

// Mensajes personalizados reutilizables
const messages = {
    stringBase: 'El campo {#label} debe ser un texto.',
    required: 'El campo {#label} es obligatorio.',
    pattern: 'El campo {#label} solo puede contener letras y espacios.',
    email: 'El campo {#label} debe ser un correo electrónico válido.',
    numberBase: 'El campo {#label} debe ser un número.',
    integer: 'El campo {#label} debe ser un número entero.',
    valid: 'El campo {#label} debe ser uno de los valores permitidos: {#valids}.',
    passwordPattern: 'La contraseña debe tener al menos una letra, un número, un símbolo especial y un mínimo de 8 caracteres.'
};

// 🔹 Esquema para **CREAR** usuario (todos los campos requeridos)
export const userFields = Joi.object({
    first_name: Joi.string().pattern(/^[a-zA-Z\s]+$/).required().messages({
        'string.base': messages.stringBase,
        'string.empty': messages.required,
        'string.pattern.base': messages.pattern
    }).label('Nombre'),

    last_name: Joi.string().pattern(/^[a-zA-Z]+$/).required().messages({
        'string.base': messages.stringBase,
        'string.empty': messages.required,
        'string.pattern.base': messages.pattern
    }).label('Apellido'),

    email: Joi.string().email().required().messages({
        'string.email': messages.email,
        'string.empty': messages.required
    }).label('Correo Electrónico'),

    age: Joi.number().integer().positive().required().messages({
        'number.base': messages.numberBase,
        'number.empty': messages.required,
        'number.integer': messages.integer,
    }).label('Edad'),

    password: Joi.string()
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{8,}$'))
    .required()
    .messages({
        'string.pattern.base': messages.passwordPattern ,
        'string.empty': 'La contraseña no puede estar vacía.',
        'any.required': 'La contraseña es obligatoria.'
    })
    // password: Joi.string()
    //     .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,30}$/)
    //     .required().alphanum().min(8).messages({
    //     'string.base': messages.stringBase,
    //     'string.empty': messages.required,
    //     'string.pattern.base': messages.passwordPattern
    // }).label('Contraseña'),

    // role: Joi.string().valid('user', 'admin').required().messages({
    //     'string.base': messages.stringBase,
    //     'any.only': messages.valid
    // }).label('Rol')
}).options({ abortEarly: false, stripUnknown: true });



// 🔹 Middleware dinámico para validación
export const validatorUser = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        const errorDetails = error.details.map(err => ({
            field: err.context.label,
            message: err.message
        }));
        return res.status(400).json({ errors: errorDetails });
    }

    req.body = value;
    next();
};
