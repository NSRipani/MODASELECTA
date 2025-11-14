import Users from "./models/user.model.js";

class UserDao{
    async allUsers(){
        return await Users.find().populate('cart _id')
    }
    async getById(id) {
        return await Users.findById(id).populate('cart _id')
    }
    async findByEmail(email) {
        return await Users.findOne({ email: email });
    }
    async findByRole(role) {
        return await Users.find({ role: role });
    }
    async register(user) {
        return await Users.create(user);
    }
    
    // ACTUALIZAR CONTRASEÑA
    async changePassword(email, newPassword) {
        return await Users.updateOne({ email }, { password: newPassword });
    }
    async updatePassword( id, hashedPassword ) {
        return await Users.findOneAndUpdate(
            { id: id },
            { password: hashedPassword },
            { new: true }
        );
        // if (updatedUser) {
        //     updatedUser.password = undefined; // Oculta la contraseña en el resultado
        // }
        // return updatedUser;
    }
    
    // ACTUALIZAR DATOS DE USUARIOS
    async update(id, data) {
        return await Users.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        return await Users.findByIdAndDelete(id)
    }
}
export const userDao = new UserDao();


