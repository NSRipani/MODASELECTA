import { Router } from "express";
import { passwordResetController } from "../../controllers/passwordReset.controller.js";
import { passportCall } from "../../middleware/passportCall.js";
import checkAuthCookies from "../../auth/checkCookie.js";

const passwordRouter = Router()

passwordRouter.post('/forgot', passwordResetController.requestReset) 

passwordRouter.post('/reset', passwordResetController.resetPassword)

export default passwordRouter