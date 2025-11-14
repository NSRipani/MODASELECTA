import UserDTO from "../dto/user.dto.js";
import { isValidPassword, createHash } from '../../utils.js';
import { userRepository } from "../repository/userRepository.js";
import generateToken from "../auth/auth.js";
import { cartService } from "../service/carts.service.js";

class UserService {
    async getUsers() {
        const users = await userRepository.getUsers();
        console.log("Users:", users);
        return users.map(user => UserDTO.userDto(user));
    }
    async getUserById(id) {
        try {
            const user = await userRepository.getUserById(id);
            if (!user) throw new Error("User not found");
            return UserDTO.userDto(user);
        } catch (error) {
            throw new Error(`Error retrieving user: ${error.message}`);
        }
    }
    
    async getUserByRole(role) {
        try {
            const roleUser = await userRepository.getUserByRole(role);
            if (!roleUser || roleUser.length === 0) throw new Error("Role not found");
            return roleUser.map(user => UserDTO.userDto(user));
        } catch (error) {
            throw new Error(`Error retrieving user by role: ${error.message}`);
        }
    };

    async getUserByEmail(email) {
        try{
            const emailUser = await userRepository.getUserByEmail(email);
            if (!emailUser) throw new Error("Email not found");
            return UserDTO.userDto(emailUser);
        } catch (error) {
            throw new Error(`Error retrieving user by email: ${error.message}`);
        }
    };

    async registerUser(user) {
        const { email, password } = user;
        const existUser = await userRepository.getUserByEmail(email)
        if (existUser) throw new Error("User already exists");

        const newUser = await userRepository.createUser({
            ...user,
            password: createHash(password)
        });

        return UserDTO.userDto(newUser);
    };

    async login (user ) {
        const { email, password } = user;

        const userExist = await userRepository.getUserByEmail(email);
        if (!userExist) throw new Error("Email not found");

        const isPasswordValid = isValidPassword(password, userExist);
        if (!isPasswordValid) throw new Error("Invalid credentials");

        // Solo asignar carrito si el usuario NO es admin
        let idCart = null;
        if (userExist.role !== 'admin') {
            const idCart = await cartService.getCartByUser(userExist.id);
            userExist.cart = idCart.id;
            console.log('idCart: ', idCart);
        }
        
        const token = generateToken(userExist);

        return { user: UserDTO.userDto(userExist) , token};
    };
    
    // ACTUALIZAR CONTRASEÑA
    async changePassword(email, newPassword) {
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        
        const hashedPassword = createHash(newPassword);
        await userRepository.updateUserPassword(email, hashedPassword);
        return { message: 'Password changed successfully' };
    }

    async updateUserPassword( id, password, newPassword) {
        try {
            // Verificar que se proporcionen todos los datos necesarios
            if (!password || !newPassword ) {//|| !confirmPassword
                throw new Error("Faltan datos");
            }
            
            // Verificar que las nuevas contraseñas coincidan
            // if (newPassword !== confirmPassword) {
            //     throw new Error("Las contraseñas no coinciden");
            // }

            // Buscar usuario
            const user = await userRepository.getUserById(id);
            if (!user) throw new Error("Usuario no encontrado.");

            // Verificar contraseña actual
            const isNewPasswordValid = isValidPassword(password, user.password);
            if (!isNewPasswordValid) throw new Error("La contraseña actual es incorrecta");
            
            // Hashear nueva contraseña
            const hashedPassword = createHash(isNewPasswordValid);

            const change = await userRepository.changePassword(id, hashedPassword);
            if (!change) throw new Error("Error al actualizar la contraseña");

            return UserDTO.userDto(change)
        } catch (error) {
            throw new Error ( `HOLA: ${error.message}`)
        }
    }

    // ACTUALIZAR USUARIO
    async updateUser(id, data) {
        try{
            const updatedUser = await userRepository.updateUser(id, data);
            if (!updatedUser) throw new Error("User not found");
            return UserDTO.userDto(updatedUser);
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async deleteUser(id) {
        try{
            const deletedUser = await userRepository.deleteUser(id);
            if (!deletedUser) throw new Error("User not found");
            return UserDTO.userDto(deletedUser);
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

export const userService = new UserService();

