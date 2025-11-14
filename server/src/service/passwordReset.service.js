import crypto from 'crypto';
import { userRepository } from '../repository/userRepository.js';
import { passwordResetRepository } from '../repository/passResetRepository.js';
import { sendRecoveryEmail } from '../utils/mailer.js';
import { createHash } from '../../utils.js';

class PasswordResetService {
    async requestReset(email) {
        const user = await userRepository.getUserByEmail(email);
        if (!user) return { message: 'Si el correo existe, se enviará un código.' };

        const code = crypto.randomInt(100000, 999999).toString();
        console.log(`Código de verificación para ${email}: ${code}`); // Para desarrollo
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

        await passwordResetRepository.createResetRecord(user._id, code, expiresAt);
        await sendRecoveryEmail(email, code);

        return { message: 'Si el correo existe, se enviará un código.' };
    }

    async verifyCodeAndReset(email, code, newPassword) {
        const user = await userRepository.getUserByEmail(email);
        if (!user) throw new Error('Usuario no encontrado');

        const record = await passwordResetRepository.getValidCode(user._id, code);
        if (!record) throw new Error('Código inválido o expirado');

        const hashed = createHash(newPassword, 10);
        await userRepository.changePassword(user.id, hashed);
        await passwordResetRepository.markAsUsed(record._id);

        return { message: 'Contraseña actualizada correctamente.' };
    }
}

export const passwordResetService = new PasswordResetService();
