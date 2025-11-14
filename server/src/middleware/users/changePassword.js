import Joi from 'joi'

// Mensajes personalizados reutilizables
const messages = {
    stringBase: 'El campo {#label} debe ser un texto.',
    required: 'El campo {#label} es obligatorio.',
    passwordPattern: 'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un símbolo.'
};
// 🔹 Esquema SOLO para cambiar contraseña
export const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required().messages({
        'string.base': messages.stringBase,
        'string.empty': messages.required,
    }).label('Contraseña Actual'),

    newPassword: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,30}$/).required().messages({
        'string.empty': messages.required,
        'string.pattern.base': messages.passwordPattern
    }).label('Nueva Contraseña'),

    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
        'any.only': 'La confirmación de la contraseña no coincide.',
        'string.empty': messages.required
    }).label('Confirmar Contraseña')
});


export const validar = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        const errorDetails = error.details.map(err => ({
            field: err.context.label,
            message: err.message
        }));
        console.error("Errores de validación:", errorDetails);
        return res.status(400).json({ errors: errorDetails });
    }
    req.body = value; // Actualizamos el cuerpo con los valores validados y limpios
    next();
};