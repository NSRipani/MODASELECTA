import { createContext, useContext, useState } from 'react';
import { botonNO, botonSI, estilo, fondo } from '../components/message/style/style.jsx';
// import { error, notify.success } from '../components/message/message.jsx';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuthContext } from './authContext.jsx';
import { useNotification } from './notificationContext.jsx';
// import { useNavigate } from 'react-router-dom';

const UserContextOptimized = createContext();

export const useUserContextOptimized = () => useContext(UserContextOptimized);

export const UserContextOptimizedProvider = ({ children }) => {
    const { payload, role, setRole } = useAuthContext(); // Obtener payload de AuthContext

    const notify = useNotification();
    
    // const navigate = useNavigate();

    const [listUser, setListUser] = useState([]);
    const [user, setUser] = useState({ first_name: '', last_name: '', age: 0, email: '', password: '' });
    const [email, setEmail] = useState('');
    // const [roles, setRoles] = useState("role");

    const rute = 'http://localhost:8000/api/users';
    const rutePassword = 'http://localhost:8000/api/password';

    const registerUser = async (data) => {
        try {
            const response = await axios.post(`${rute}/register`, data);
            if (response.status === 201) {
                setListUser(response.data)
                setUser({ first_name: '', last_name: '', age: 0, email: '', password: '' });
                notify.success('Usuario registrado exitosamente');
                // navigate('/users/login');
                // return true;
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error.response?.data);
            notify.error('Error al registrar el usuario. Corrobore los datos');
        }
    };

    const updateUser = async (id, data) => {
        try {
            const response = await axios.patch(`${rute}/${id}`, data, { withCredentials: true });
            if (response.status === 200) {
                setListUser((prevList) =>
                    prevList.map((u) => (u.id === id ? response.data.user : u))
                );
                // notify.success('Usuario actualizado!');
                setUser({ first_name: '', last_name: '', age: 0, email: '', role: '' });
            }
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            notify.error('Error al actualizar el usuario.');
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
            notify.error('Error al actualizar el usuario.');
        }
    };

    const deleteUser = async (id) => {
        const eliminarUsuario = async (id) => {
            try {
                const response = await axios.delete(`${rute}/${id}`, { withCredentials: true });
                if (response.status === 200) {
                    notify.success('Usuario eliminado!');
                    setListUser((prevList) => prevList.filter((user) => user.id !== id));
                }
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
                notify.error('Error al eliminar el usuario.');
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

    const allUser = async () => {
        try {
            const response = await axios.get(`${rute}`, { withCredentials: true });
            if (response.status === 200) {
                // notify.success('¡Lista de usuarios!');
                setListUser(response.data.users);
            }
        } catch (error) {
            console.error('Error al mostrar los usuarios:', error.response?.data);
            notify.error('Error al mostrar usuarios.');
        }
    };

    const hideUsers = async () => {
        setListUser([]);
        notify.success('Lista de usuarios oculta.');
    };

    const clean = () => {
        setUser({ first_name: '', last_name: '', age: 0, email: '', role: '' });
    }

    const searchRol = async () => {
        try {
            const res = await axios.get(`${rute}/role`, { params: { role: role }, withCredentials: true });
            if (res.status === 200) {
                const users = res.data.users;
                setListUser(users);
                // notify.success('Usuarios filtrados por rol');
                // Reiniciar el select en panelUser (valor por defecto)
                setRole('');
            }
        } catch (error) {
            console.error(error, 'Por favor, selecciona un criterio de búsqueda válido.');
            notify.error('Por favor, selecciona un criterio de búsqueda válido.');
        }
    }
    const searchEmail = async () => {
        try {
            const res = await axios.get(`${rute}/email`, { params: { email: email }, withCredentials: true })
            if (res.status === 200) {
                const user = res.data.email
                setListUser(user);  //? [user] : []
                setEmail(user.email)
                console.log('listafff: ', res.data.email)
                success('Usuario encontrado')
            }
        } catch (error) {
            console.error(`${error}, Por favor, selecciona un criterio de búsqueda válido.`)
            notify.error("Por favor, selecciona un criterio de búsqueda válido.");
        }
    }
    const resetSearchRole = () => {
        setRole('');
        setListUser([]);
    };
    const resetSearchEmail = () => {
        setEmail('');
        setListUser([]);
    }

    // Password reset functions
    const requestPasswordReset = async (email) => {
        try {
            const response = await axios.post(`${rutePassword}/request-reset`, { email });
            if (response.status === 200) {
                notify.success('Código de recuperación enviado al email');
            }
        } catch (error) {
            notify.error('Error al enviar el código de recuperación');
        }
    };

    const resetPassword = async (email, code, newPassword) => {
        try {
            const res = await axios.post(`${rutePassword}/reset`, { email, code, newPassword });
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            // const msg = error?.response?.data?.message || 'Error al restablecer la contraseña.';
            // error(msg);
            throw error;
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        try {
            const response = await axios.patch(`${rutePassword}/change`, { currentPassword, newPassword }, { withCredentials: true });
            if (response.status === 200) {
                notify.success('Contraseña cambiada exitosamente');
            }
        } catch (error) {
            notify.error('Error al cambiar la contraseña');
        }
    };

    return (
        <UserContextOptimized.Provider value={{
            listUser, setListUser, user, setUser, 
            email, setEmail, searchEmail, resetSearchEmail, searchRol, resetSearchRole,
            registerUser, allUser, updateUser, updateUserProfile, deleteUser, hideUsers, clean,
            requestPasswordReset, resetPassword, changePassword
        }}>
            {children}
        </UserContextOptimized.Provider>
    );
};