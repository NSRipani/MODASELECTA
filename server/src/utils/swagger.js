// import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import { basename } from './../../utils.js';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation: Project API E-commerce',
        },
        servers: [
            { url: `http://localhost:8000` }
        ],
    },
    apis: [`${basename}/src/docs/**/*.yml`],
};

const specs = swaggerJSDoc(options);
export default specs;