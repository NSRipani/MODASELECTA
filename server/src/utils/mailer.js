import nodemailer from 'nodemailer';
import 'dotenv/config';

// Soporte para varias formas de nombrar variables en .env
const SMTP_HOST = process.env.HOST || process.env.SMTP_HOST || 'smtp.ethereal.email';
const SMTP_PORT = process.env.PORT_ETHEREAL ? Number(process.env.PORT_ETHEREAL) : (process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587);
const SMTP_USER = process.env.EMAIL_USER || process.env.EMAIL || process.env.SMTP_USER;
const SMTP_PASS = process.env.EMAIL_PASS || process.env.PASSWORD || process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    tls: { rejectUnauthorized: false },
});

export const sendRecoveryEmail = async (email, code) => {
    try {
        if (!SMTP_USER || !SMTP_PASS) {
            throw new Error('Faltan credenciales SMTP: revisa EMAIL/EMAIL_USER y PASSWORD/EMAIL_PASS en .env');
        }

        const info = await transporter.sendMail({
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

        try {
            const url = nodemailer.getTestMessageUrl(info);
            if (url) console.log('Preview URL:', url);
        } catch (err) {
            /* no-op */
        }

        return info;
    } catch (error) {
        console.error('Error enviando email de recuperación:', error.message);
        throw error;
    }
};
