import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();
import { userService } from "../service/user.service.js";

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies && req.cookies.token) {
        token = req.cookies.token
    }
    return token
};

const strategyCookiesConfig = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken()
    ]),
    secretOrKey: process.env.SECRET_KEY,
};

const verifyToken = async (payload, done) => {
    try {
        const user = await userService.getUserById(payload.id);
        // console.log("USER:", user);
        if (!user) return done(null, false, { messages: "El usuario asociado al token no existe" });
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
};



passport.use('current', new Strategy(strategyCookiesConfig, verifyToken));

passport.serializeUser((user, done) => {
    try {
        done(null, user._id);
    } catch (error) {
        done(error);
    }
});

passport.deserializeUser(async (id, done) => {
    try {
        const userId = await userService.getUserById(id)
        if (!userId) {
            console.log("ID user:", userId);
            return done(null, false, { message: "Usuario no encontrado" });
        }
        console.log("ID user:", userId);
        return done(null, userId);
    } catch (error) {
        done(error);
    }
});

// export default passport;