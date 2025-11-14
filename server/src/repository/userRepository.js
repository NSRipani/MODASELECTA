import { userDao } from "./../dao/dao.user.js";

class UserRepository {

    async getUsers() {
        return await userDao.allUsers();
    }

    async getUserById(id) {
        return await userDao.getById(id);
    }
    
    async getUserByEmail(email) {
        return await userDao.findByEmail(email);
    }

    async getUserByRole(role) {
        return await userDao.findByRole(role);
    }

    async createUser(user) {
        return await userDao.register(user);
    }
    
    // ACTUALIZAR USUARIO
    async updateUser(id, data) {
        return await userDao.update(id, data);
    }

    // ACTUALIZAR CONTRASEÑA
    async updateUserPassword(email, newPassword) {
        return await userDao.changePassword(email, newPassword);
    }
    
    async changePassword(id, newPassword) {
        return await userDao.updatePassword(id, newPassword);
    }

    async deleteUser(id) {
        return await userDao.delete(id);
    }
}
export const userRepository = new UserRepository();