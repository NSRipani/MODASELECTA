import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorMessag, info, success } from '../components/message/message.jsx';
import { toast } from 'sonner';
import axios from 'axios';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [jwt, setJwt] = useState(null);
    const [role, setRole] = useState(null);
    const [payload, setPayload] = useState(null);
    const [login, setLogin] = useState({ email: '', password: '' });

    const navigate = useNavigate();
    const rute = 'http://localhost:8000/api/users';

    const id = payload?.id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${rute}/session`, login, { withCredentials: true });
            const token = response.data.token;

            if (response.status === 200) {
                setLogin({ email: '', password: '' });
                const accessUser = await axios.get(`${rute}/access`, { withCredentials: true });

                if (accessUser.status === 200) {
                    const usuario = accessUser.data.payload;
                    setPayload(usuario);
                    setRole(usuario?.role);
                    if (usuario?.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                    success('Login exitoso');
                }
            }
        } catch (error) {
            errorMessag('Error en el login');
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${rute}/logout`, {}, { withCredentials: true });
            setJwt(null);
            setRole(null);
            setPayload(null);
            navigate('/');
            success('Sesión cerrada');
        } catch (error) {
            errorMessag('Error al cerrar sesión');
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${rute}/access`, { withCredentials: true });
                if (response.status === 200) {
                    setPayload(response.data.payload);
                    setRole(response.data.payload?.role);
                }
            } catch (error) {
                // No autenticado
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{
            jwt, setJwt, role, setRole, payload, setPayload, login, setLogin, handleSubmit, logout, id
        }}>
            {children}
        </AuthContext.Provider>
    );
};