import { userService } from "../service/user.service.js";
import jwt from 'jsonwebtoken';
import logger from "../utils/logger.js";
import e from "express";

class UserController {

    async getAll(req, res, next) {
        try {
            const users = await userService.getUsers();
            res.status(200).json({ message: 'Users found', users: users });
            if (!users.length > 0){
                logger.warn('No users found in the database');
                return res.status(404).json({ message: "No users found" });
            }
            logger.info('All users retrieved successfully');
        } catch (error) {
            logger.error('Error retrieving all users');
            next(error);
        }
    };

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const users = await userService.getUserById(id);
            if (!users) {
                logger.warn(`No user found with ID ${users.id}`);
                return res.status(404).json({ message: "No user found" });
            }
            res.status(200).json({ message: 'User found', users: users });
            logger.info(`User with ID '${users.id}' retrieved successfully`);
        } catch (error) {
            logger.error('Error retrieving user with ID');
            next(error);
        }
    };
    async getByRole(req, res, next) {
        try {
            const { role } = req.query;
            const users = await userService.getUserByRole(role);
            if (!users.length > 0 ) {
                logger.warn(`No users found with role ${users.role}`);
                return res.status(404).json({ message: "No users found" });
            }
            
            res.status(200).json({ message: 'Users found', users: users });
            logger.info(`Users with role '${users.role}' retrieved successfully`);
        } catch (error) {
            logger.error(`Error retrieving users with role `);
            next(error);
        }
    }
    async getByEmail(req, res, next) {
        try {
            const { email } = req.query;
            const users = await userService.getUserByEmail(email);
            if (!users) {
                logger.warn(`No user found with email '${users.email}'`);
                return res.status(404).json({ message: "No users found" });
            }
            res.status(200).json({ message: 'Email found', email: users });
            logger.info(`User with email '${users.email}' retrieved successfully`);
        } catch (error) {
            logger.error('Error retrieving user with email');
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const data = req.body
            const newUser = await userService.registerUser(data)
            logger.info(`UserObj: ${newUser}`)
            res.status(201).json({ message: "User created", user: newUser })
            logger.info('New user created successfully');   
        } catch (error) {
            logger.error('Error creating new user');    
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            const { token } = await userService.login(req.body);
            console.log('token:', token)
            res.cookie('token', token, { 
                httpOnly: true, 
                secure: process.env.COOKIE === 'cookie', 
                sameSite: 'Lax', 
                maxAge: 1000 * 60 * 60 * 24 
            }).json({ message: 'Login OK', token: token})
            logger.info('User logged in successfully');
        } catch (error) {
            logger.error('Error during user login');
            next(error);
        }
    };

    async logout(req, res, next) {
        try {
            res.clearCookie('token')
            res.status(200).json({ status: "success", message: 'Logout OK' });
            logger.info('User logged out successfully');
        } catch (error) {
            logger.error('Error during user logout');
            next(error);
        }
    }

    async profile(req, res, next) {
        try {
            const cookie = req.cookies['token']
            const user = jwt.verify(cookie, process.env.SECRET_KEY);
            if (user) res.send({ status: "success", payload: user })
            logger.info('User profile retrieved successfully'); 
        }
        catch (error) {
            logger.error('Error retrieving user profile');  
            next(error);
        }
    }
    // async admin(req, res, next) {
    //     try {
    //         const cookie = req.cookies['token']
    //         const user = jwt.verify(cookie, process.env.SECRET_KEY);
    //         if (user)
    //             return res.send({ status: "success", payload: user })
    //     }
    //     catch (error) {
    //         next(error);
    //     }
    // }

    // ACTUALIZAR CONTRASEÑA
    async changePassword(req, res, next) {
        const { email, newPassword } = req.body;
        try {
            const result = await userService.changePassword(email, newPassword);
            res.status(200).json(result);
            logger.info('Password changed successfully');
        } catch (error) {
            logger.error('Error changing password');
            next(error);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { password, newPassword } = req.body;
            
            const userId = req.user.id; // viene del token/session

            const response = await userService.updateUserPassword(userId, password, newPassword);
            if (!response) return res.status(400).json({ message: "Contraseña requeridos o Datos erroneos" });

            res.status(200).json({ message: "Contraseña cambiada correctamente", payload: response});

        } catch (error) {
            next(error);
        }
    }

    // ACTUALIZAR USUARIO
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedUser = await userService.updateUser(id, data);
            res.status(200).json({ message: "User updated", user: updatedUser });
            if (!updatedUser) {
                logger.warn(`Intento de actualizar usuario inexistente con ID '${id}'`);
                res.status(404).json({ message: "User not updated"});
            }
            logger.info(`User with ID ${id} updated successfully`); 
        } catch (error) {
            logger.error('Error updating user with ID');  
            next(error);
        }
    };

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedUser = await userService.deleteUser(id);
            res.status(200).json({ message: "User deleted", user: deletedUser });
            if (!deletedUser) {
                logger.warn(`Intento de eliminar usuario inexistente con ID '${id}'`);
                res.status(404).json({ message: "User not deleted", user: deletedUser });
            }
            logger.info(`User with ID ${id} deleted successfully`); 
        } catch (error) {
            logger.error('Error deleting user with ID');
            next(error);
        }
    };
}
export const userController = new UserController();