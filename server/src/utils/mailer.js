import { createTransport } from 'nodemailer'
import 'dotenv/config';

const transporter = createTransport({
    host: process.env.HOST,
    port: process.env.PORT_ETHEREAL,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    
});

export const sendRecoveryEmail = async (email, code) => {
    await transporter.sendMail({
        from: '"Soporte" <soporte@tuapp.com>',
        to: email,
        subject: 'Recupera tu contraseña',
        html: `
        <h3>Recuperación de contraseña</h3>
        <p>Tu código de verificación es:</p>
        <h2>${code}</h2>
        <p>Este código expira en 10 minutos.</p>
        `,
    });
};
