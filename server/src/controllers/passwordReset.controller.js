import { passwordResetService } from '../service/passwordReset.service.js';

class PasswordResetController {
    async requestReset(req, res, next) {
        try {
            const { email } = req.body;
            const result = await passwordResetService.requestReset(email);
            res.status(200).json(result);
        } catch (error) {
            next(error)        
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { email, code, newPassword } = req.body;
            const result = await passwordResetService.verifyCodeAndReset(email, code, newPassword);
            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }
}

export const passwordResetController = new PasswordResetController();
