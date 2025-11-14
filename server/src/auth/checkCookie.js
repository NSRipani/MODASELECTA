import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const checkAuthCookies = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Extrae el token de las cookies
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const payloadDecode = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("USERAAAAA:", payloadDecode);
        
        req.user = payloadDecode; // Asignar el usuario decodificado a req.user
        
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Session expired" });
        }
        console.error("Error verifying token:", error);
        throw new Error("Forbidden");
    }
};
export default checkAuthCookies;