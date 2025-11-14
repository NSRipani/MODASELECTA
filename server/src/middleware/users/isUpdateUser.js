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
    passwordPattern: 'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un símbolo.'
};

// 🔹 Esquema para **CREAR** usuario (todos los campos requeridos)
export const updateUserFields = Joi.object({
    first_name: Joi.string().pattern(/^[a-zA-Z\s]+$/).messages({
        'string.base': messages.stringBase,
        'string.empty': messages.required,
        'string.pattern.base': messages.pattern
    }).label('Nombre').optional(),

    last_name: Joi.string().pattern(/^[a-zA-Z]+$/).messages({
        'string.base': messages.stringBase,
        'string.empty': messages.required,
        'string.pattern.base': messages.pattern
    }).label('Apellido').optional(),

    age: Joi.number().integer().positive().messages({
        'number.base': messages.numberBase,
        'number.empty': messages.required,
        'number.integer': messages.integer,
    }).label('Edad').optional(),

    email: Joi.string().email().messages({
        'string.email': messages.email,
        'string.empty': messages.required
    }).label('Correo Electrónico').optional(),

    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,30}$/).messages({
        'string.base': messages.stringBase,
        'string.empty': messages.required,
        'string.pattern.base': messages.passwordPattern
    }).label('Contraseña').optional(),

    role: Joi.string().valid('user', 'admin').messages({
        'string.base': messages.stringBase,
        'any.only': messages.valid
    }).label('Rol').optional()
}).min(1)
// .options({ abortEarly: false, stripUnknown: true });



// 🔹 Middleware dinámico para validación
export const updateUser = (Schema) => (req, res, next) => {
    
    const { error, value } = Schema.validate(req.body,{ 
        abortEarly: false,
        stripUnknown: true
    })
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
