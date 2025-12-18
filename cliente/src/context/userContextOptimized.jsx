import { createContext, useContext, useState } from 'react';
import { botonNO, botonSI, estilo, fondo } from '../components/message/style/style.jsx';
import { errorMessag, success } from '../components/message/message.jsx';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuthContext } from './authContext.jsx';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
    const { payload } = useAuthContext(); // Obtener payload de AuthContext

    const [listUser, setListUser] = useState([]);
    const [user, setUser] = useState({ first_name: '', last_name: '', age: 0, email: '', role: '' });
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState("role");

    const rute = 'http://localhost:8000/api/users';
    const rutePassword = 'http://localhost:8000/api/password';

    const registerUser = async (data) => {
        try {
            const response = await axios.post(`${rute}/register`, data);
            if (response.status === 201) {
                success('Usuario registrado exitosamente');
                setUser({ first_name: '', last_name: '', age: 0, email: '', role: '' });
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error.response?.data);
            errorMessag('Error al registrar el usuario. Corrobore los datos');
        }
    };

    const allUser = async () => {
        try {
            const response = await axios.get(`${rute}`, { withCredentials: true });
            if (response.status === 200) {
                success('¡Lista de usuarios!');
                setListUser(response.data.users);
            }
        } catch (error) {
            console.error('Error al mostrar los usuarios:', error.response?.data);
            errorMessag('Error al mostrar usuarios.');
        }
    };

    const updateUser = async (id, data) => {
        try {
            const response = await axios.patch(`${rute}/${id}`, data, { withCredentials: true });
            if (response.status === 200) {
                setListUser((prevList) =>
                    prevList.map((u) => (u.id === id ? response.data.user : u))
                );
                success('Usuario actualizado!');
                setUser({ first_name: '', last_name: '', age: 0, email: '', role: '' });
            }
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            errorMessag('Error al actualizar el usuario.');
        }
    };

    const updateUserProfile = async (id, data) => {
        try {
            const response = await axios.patch(`${rute}/${id}/edit-profile`, data, { withCredentials: true });
            if (response.status === 200) {
                setListUser((prevList) =>
                    prevList.map((u) => (u.id === id ? response.data.user : u))
                );
            }
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            errorMessag('Error al actualizar el usuario.');
        }
    };

    const deleteUser = async (id) => {
        const eliminarUsuario = async (id) => {
            try {
                const response = await axios.delete(`${rute}/${id}`, { withCredentials: true });
                if (response.status === 200) {
                    success('Usuario eliminado!');
                    setListUser((prevList) => prevList.filter((user) => user.id !== id));
                }
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
                errorMessag('Error al eliminar el usuario.');
            }
        };
        toast((t) => (
            <div>
                <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                <div style={estilo}>
                    <button style={botonSI} onClick={async () => { toast.dismiss(t); await eliminarUsuario(id); }}>Sí</button>
                    <button style={botonNO} onClick={() => toast.dismiss(t)}>No</button>
                </div>
            </div>
        ), { duration: Infinity, position: "top-center", style: fondo });
    };

    const hideUsers = async () => {
        setListUser([]);
        success('Lista de usuarios oculta.');
    };

    // Password reset functions
    const requestPasswordReset = async (email) => {
        try {
            const response = await axios.post(`${rutePassword}/request-reset`, { email });
            if (response.status === 200) {
                success('Código de recuperación enviado al email');
            }
        } catch (error) {
            errorMessag('Error al enviar el código de recuperación');
        }
    };

    const resetPassword = async (token, newPassword) => {
        try {
            const response = await axios.post(`${rutePassword}/reset`, { token, newPassword });
            if (response.status === 200) {
                success('Contraseña restablecida exitosamente');
            }
        } catch (error) {
            errorMessag('Error al restablecer la contraseña');
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        try {
            const response = await axios.patch(`${rutePassword}/change`, { currentPassword, newPassword }, { withCredentials: true });
            if (response.status === 200) {
                success('Contraseña cambiada exitosamente');
            }
        } catch (error) {
            errorMessag('Error al cambiar la contraseña');
        }
    };

    return (
        <UserContext.Provider value={{
            listUser, setListUser, user, setUser, email, setEmail, roles, setRoles,
            registerUser, allUser, updateUser, updateUserProfile, deleteUser, hideUsers,
            requestPasswordReset, resetPassword, changePassword
        }}>
            {children}
        </UserContext.Provider>
    );
};