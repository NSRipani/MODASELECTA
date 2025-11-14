import { passwordResetDao } from '../dao/dao.passwordReset.js';

class PasswordResetRepository {
    async createResetRecord(userId, code, expiresAt) {
        await passwordResetDao.deleteByUserId(userId); // limpia intentos previos
        return await passwordResetDao.create({ userId, code, expiresAt });
    }

    async getValidCode(userId, code) {
        return await passwordResetDao.findValidCode(userId, code);
    }

    async markAsUsed(id) {
        return await passwordResetDao.markAsUsed(id);
    }
}

export const passwordResetRepository = new PasswordResetRepository();
