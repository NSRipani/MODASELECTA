import Joi from 'joi';

export const contactSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(5).required(),
    // recaptchaToken: Joi.string().required()  // importante para reCAPTCHA
});
