import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import morgan from 'morgan';
import cors from 'cors'
import { createServer } from 'http';
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
// import { engine } from 'express-handlebars'
// import { Server } from "socket.io";
import '../server/src/config/jwtStrategy.js'
import router from './src/route/index.route.js';
import errorHandler from '../server/src/middleware/errorHandler.js';
import pathHandler from "../server/src/middleware/pathHandler.js";
import dbConnect from '../server/src/utils/db.utils.js'
import { __dirname } from './utils.js';
import specs from '../server/src/utils/swagger.js';
import swaggerUi from 'swagger-ui-express';
import logger from './src/utils/logger.js';

const server = express();

// Configuración de CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
};

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: process.env.LINK_MONGO,
        crypto: { secret: process.env.SECRET_KEY },
        ttl: 86400, // 1 dia en segundos
    }),
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: false,
    // cookie: {
    //     maxAge: 86400000, // 1 día en milisegundos
    //     httpOnly: true,
    //     secure: true, // true si usas HTTPS
    //     sameSite: 'Lax'
    // }
};
const port = process.env.PORT || 8000;

const ready = () => {
    logger.info(`server ready on port ${port}`);
    dbConnect()
}
const httpServer = createServer(server);
httpServer.listen(port, ready);

// const socketServer = new Server(httpServer);
// socketServer.on("connection", socket);
// export {socketServer}

// server.engine("handlebars", engine())
// server.set("view engine", "handlebars")
// server.set("views", __dirname + "/src/views")

server.use(cors(corsOptions))
server.use(cookieParser())
server.use(express.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

server.use(express.urlencoded({ extended: true }));

server.use(session(storeConfig))

server.use(passport.initialize());
server.use(passport.session());

server.use(morgan('dev'))
server.use('/assets', express.static(__dirname +'/src/assets'));

server.use(router)


server.use(errorHandler);
server.use(pathHandler)

