import { Router } from "express";
import { roleAuth } from '../../middleware/roleUser.js';
import { passportCall } from '../../middleware/passportCall.js';
import loginCheck from '../../middleware/loginCheck.js';
import { userController } from './../../controllers/user.controller.js';
import { userFields, validatorUser } from "../../middleware/users/isValidatorUser.js";
import { updateUser, updateUserFields } from "../../middleware/users/isUpdateUser.js";
import { changePasswordSchema, validar} from "../../middleware/users/changePassword.js";
import checkAuthCookies from './../../auth/checkCookie.js';

const userRouter = Router()

userRouter.get("/", passportCall('current'), roleAuth(['admin']), userController.getAll) // FUNCIONA
userRouter.get("/access", passportCall('current'), roleAuth(['user','admin']), userController.profile); // FUNCIONA
userRouter.get("/role", passportCall('current'), roleAuth(['admin']), checkAuthCookies, userController.getByRole) // FUNCIONA
userRouter.get("/email", passportCall('current'), roleAuth(['admin']), checkAuthCookies, userController.getByEmail) // FUNCIONA
userRouter.get("/:id", userController.getById) // Falta de implementar

userRouter.post("/register", validatorUser(userFields), userController.create); // FUNCIONA
userRouter.post("/session", loginCheck, userController.login); // FUNCIONA
userRouter.post("/logout", userController.logout); // FUNCIONA

// userRouter.post('/change-password', userController.changePassword); //, validate(passwordOnlySchema) Falta de implementar passportCall('current'), roleAuth(['user']),
userRouter.patch('/:id/edit-profile', passportCall('current'), roleAuth(['user']), checkAuthCookies, updateUser(updateUserFields),  userController.update); 

userRouter.patch("/:id", passportCall('current'), roleAuth(['admin']), checkAuthCookies, updateUser(updateUserFields), userController.update) 
userRouter.delete("/:id", passportCall('current'), roleAuth(['admin']),checkAuthCookies,  userController.delete)

export default userRouter;