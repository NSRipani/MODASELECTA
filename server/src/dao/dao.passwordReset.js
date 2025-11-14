import PasswordReset from '../dao/models/passwordReset.model.js';

class PasswordResetDAO {
    async create(data) {
        return await PasswordReset.create(data);
    }

    async findByUserId(userId) {
        return await PasswordReset.findOne({ userId, used: false });
    }

    async findValidCode(userId, code) {
        return await PasswordReset.findOne({
        userId,
        code,
        used: false,
        expiresAt: { $gt: new Date() },
        });
    }

    async markAsUsed(id) {
        return await PasswordReset.findByIdAndUpdate(id, { used: true });
    }

    async deleteByUserId(userId) {
        return await PasswordReset.deleteMany({ userId });
    }
}

export const passwordResetDao = new PasswordResetDAO();
