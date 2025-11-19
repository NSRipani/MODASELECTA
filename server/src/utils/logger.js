import winston from "winston";
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';

import  dotenv from "dotenv";
dotenv.config();

// Definimos los niveles de severidad
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

// Configuramos colores para cada nivel (solo en consola)
winston.addColors({
    error: "red",
    warn: "yellow",
    info: "blue",
    http: "green",
    debug: "white"
});

const logDir = path.join(process.cwd(),'src','utils', 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const logFormat = winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = winston.createLogger({
    levels,
    level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        // preserve stack for errors
        winston.format.errors({ stack: true }),
        logFormat
    ),
    transports: [
        // consola (legible en dev)
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.errors({ stack: true }),
                logFormat
            )
        }),

        // rotación diaria para errores
        new DailyRotateFile({
            level: 'error',
            dirname: logDir,
            filename: 'error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '30d'
        }),

        // rotación diaria para logs combinados (info+)
        new DailyRotateFile({
            level: 'info',
            dirname: logDir,
            filename: 'combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '30d'
        })
    ],
    exitOnError: false
});

// stream compatible con morgan
logger.stream = {
    write: (message) => {
        logger.http(message.trim());
    }
};
export default logger;
