import { socketServer } from "../../server.js";
import {userDao} from './../dao/mongo/dao.user.js';
import { prodDao } from './../dao/mongo/dao.product.js';

const socket = (socket) => {
//     console.log(socket.id)

    socket.on("products filter", async category => {
        const data = await prodDao.readAll();
        const products = category ? data.filter(product => product.category.toLowerCase() === category.toLowerCase()) : data;

        socketServer.emit("producs filtered", products)
    })

    socket.on('login', async (data) => {
        try {
            const { email, password } = data;
            // Validar las credenciales del usuario
            const dataUser = await userDao.getByEmailAndPassword(email, password);

            if (dataUser) {
                const sessionToken = generateSessionToken(dataUser._id);

                socket.emit('loginResponse', {
                    success: true,
                    token: sessionToken,
                    role: dataUser.role,
                    message: 'Inicio de sesión exitoso'
                });
            } else {
                socket.emit('loginResponse', { 
                    success: false, 
                    message: 'Credenciales incorrectas' 
                });
            }
        } catch (error) {
            console.error("Error durante el login: ", error);
            socket.emit('loginResponse', { 
                success: false, 
                message: 'Error en el servidor' 
            });
        }
    });

    socket.on('logout', () => {
        console.log(`Usuario desconectado: ${socket.id}`);
        
        socket.emit('logoutResponse', { success: true, message: 'Sesión cerrada correctamente' });
    });
};

function generateSessionToken(userId) {
    return `session_${userId}_${Date.now()}`;
}

export default socket