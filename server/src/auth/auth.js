import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (user, remember = false) => {
    const payload = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        email: user.email,
        role: user.role,
        cart: user.cart
    };

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: remember ? '7d' : '1d' });
};
export default generateToken;