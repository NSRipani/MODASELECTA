import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { botonNO, botonSI, estilo, fondo } from '../components/message/style/style.jsx';
import { errorMessag, info, success } from './../components/message/message.jsx';
import { toast } from 'sonner';
import axios from 'axios';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = (props) => {

    const [ jwt, setJwt ] = useState(null);
    const [ role, setRole ] = useState(null); 
    
    const [ payload, setPayload ] = useState(null);
    const [ login, setLogin ] = useState({email: '', password: '' });
    const [ listUser, setListUser ] = useState([])
    const [ user, setUser ] = useState({ first_name: '', last_name: '', age: 0, email: '', role: '' });
    
    const [ email, setEmail ] = useState('');
    const [ roles, setRoles ] = useState("role");

    const navigate = useNavigate();
    
    const rute = 'http://localhost:8000/api/users';
    const rutePassword = 'http://localhost:8000/api/password';
    
    const id = payload?.id

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${rute}/session`, login, { withCredentials: true, });
            const token = response.data.token;
            
            if (response.status === 200) {
                setLogin({ email: '', password: ''});
                
                const accessUser = await axios.get(`${rute}/access`, { withCredentials: true });

                if (accessUser.status === 200) {
                    const usuario = accessUser.data.payload;
                    setPayload(usuario);
                    console.log('usuario: ', usuario)
                    if (usuario?.role === 'admin') {
                        navigate('/admin');
                        success(`¡${usuario.first_name}, Has iniciado sesión exitosamente!`);
                    } else {
                        navigate('/');
                        success(`¡${usuario.first_name}, Has iniciado sesión exitosamente!`);
                    }
                }
            }
            setJwt(token); // Guardamos el JWT en el estado
            console.log('tokenCONTEXT', token)
            return token
        } catch (error) {
            console.error('Error en el login o al acceder al usuario:', error);
            errorMessag('Error al iniciar sesión. Por favor, revisá los datos.');
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`${rute}/access`, { withCredentials: true });
                if (res.status === 401) {
                    navigate('/')
                    info('Tu sesión ha expirado, vuelve a iniciar sesión.')
                }
                const usuario = res.data.payload;
                setPayload(usuario);
                setRole(usuario.role)
                setJwt(jwt)
            } catch (error) {
                console.log('Sesión no válida o no iniciada');
                setPayload(null);
                setRole(null);
            }
        };

        fetchUserData();
    }, []);

    const createUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${rute}/register`, user);
            if (response.status === 201) {
                setListUser(response.data)
                success('Usuario registrado!')
                setUser({ first_name: '', last_name: '', age: 0, email: '', role: '' });
            }
            console.log('Usuario', response.data);
        } catch (error) {
            console.error('Error al registrar el usuario:', error.response.data);
            errorMessag('Error al registrar el producto. Corrobore los datos');
        }
    };

    const allUser = async () => {
        try {
            const response = await axios.get(`${rute}`,{ withCredentials: true });
            console.log('Usuarios', response.data.users);

            if (response.status === 200) {
                success('¡Lista de usuarios!')
                setListUser(response.data.users)
            }
        } catch (error) {
            console.error('Error al mostrar el usuarios:', error.response.data);
            errorMessag('Error al mostrar usuarios.')
        }
    };
    
    const updateUser = async (id, data) => {
        try {
            const response = await axios.patch(`${rute}/${id}`, data,{ withCredentials: true })
            if (response.status === 200) {
                setListUser((prevList) => 
                    prevList.map((u) => (u.id === id ? response.data.user : u)) // Actualiza el usuario en la lista
                );
                success('Usuario actualizado!');
                setUser({ first_name: '', last_name: '', age: 0, email: '', role: '' });
            }
            console.log('Usuario', response.data.user.id);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            errorMessag('Error al actualizar el usuario.')
        }
    }
    const updateUserProfile = async (id, data) => {
        try {
            const response = await axios.patch(`${rute}/${id}/`, data,{ withCredentials: true })
            if (response.status === 200) {
                setListUser((prevList) => 
                    prevList.map((u) => (u.id === id ? response.data.user : u)) // Actualiza el usuario en la lista
                );
            }
            console.log('Usuario', response.data.user.id);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            errorMessag('Error al actualizar el usuario.')
        }
    }

    const deleteUser = async (id) => {
        const eliminarUsuario = async (id) => {
            try {
                const response = await axios.delete(`${rute}/${id}`, { withCredentials: true });
                if (response.status === 200) {
                    success('Usuario eliminado!')
                    console.log('response', response.data)
                    setListUser((prevList) => prevList.filter((user) => user.id !== id));
                }
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
                errorMessag('Error al eliminar el usuario.')
            }
        };
        toast((t) => (
            <div>
                <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                <div style={estilo}>
                    <button style={botonSI} onClick={async () => {toast.dismiss(t); await eliminarUsuario(id);}}>Sí</button>
                    <button style={botonNO} onClick={() => toast.dismiss(t)}>No</button>
                </div>
            </div>
        ),{ duration: Infinity, position: "top-center", style: fondo,});
    }
    
    const hideUsers = async () => {
        setListUser([]);
        success('Lista de usuarios oculta.')
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${rute}/logout`, {}, {
                withCredentials: true
            });
            success('¡Has cerrado sesión exitosamente!');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        } finally {
            setPayload(null);
            setRole(null);
            setJwt(null)
        }
    };
    
    // Solicita envío de código de recuperación al email (no requiere autenticación)
    const requestPasswordReset = async (email) => {
        try {
            const res = await axios.post(`${rutePassword}/forgot`, { email: email });
            console.log('res.data', res.data.result)
            // El backend responde siempre con un mensaje genérico por seguridad
            success('Correo existente, se enviará un código.');
            return res.data;
        } catch (error) {
            console.error('Error al solicitar reseteo de contraseña:', error);
            errorMessag('Error al solicitar reseteo de contraseña.');
        }
    };

    // Envía email + código + nueva contraseña para restablecer (no requiere autenticación)
    const resetPassword = async (email, code, newPassword) => {
        try {
            const res = await axios.post(`${rutePassword}/reset`, { email, code, newPassword });
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            // const msg = error?.response?.data?.message || 'Error al restablecer la contraseña.';
            // errorMessag(msg);
            throw error;
        }
    };

    const changePassword = async (email, newPassword) => {
        try {
            const response = await axios.post(`${rute}/change-password`, {
                email, newPassword,
            });
            if (response.status === 200) {
                success('¡Has cambiado la contraseña exitosamente!');
            }
            console.log(response.data);
        } catch (error) {
            console.error('Error changing password:', error.response.data);
        }
    };

    const searchRol = async () => {
        try {
            const res = await axios.get(`${rute}/role?role=${roles}`, { withCredentials: true })
            if (res.status === 200) {
                const user = res.data.users
                setListUser(user)
                setRoles('')
                success('Rol de usuarios')
            }
            
        } catch (error) {
            console.error(`${error}, Por favor, selecciona un criterio de búsqueda válido.`)
            info("Por favor, selecciona un criterio de búsqueda válido.");
        }
    }
    const searchEmail = async () => {
        try {
            const res = await axios.get(`${rute}/email`, { params: { email }, withCredentials: true })
            if (res.status === 200) {
                const user = res.data.email
                setListUser(user ? [user] : []);
                setEmail('')
                console.log('listafff: ', res.data.email)
                success('Usuario encontrado')
            }
        } catch (error) {
            console.error(`${error}, Por favor, selecciona un criterio de búsqueda válido.`)
            info("Por favor, selecciona un criterio de búsqueda válido.");
        }
    }
    const resetSearchRole = () => {
        setRoles('')
        setListUser([])
    };
    const resetSearchEmail = () => {
        setEmail('')
        setListUser([])
    }

    const clean = () => {
        setUser({ first_name: '', last_name: '', age: 0, email: '', role: '' });
    }

    return (
            <UserContext.Provider value={{ 
                payload, setPayload, jwt, setJwt, login, setLogin, handleLogout, 
                
                roles, setRoles, email, setEmail, changePassword, requestPasswordReset, resetPassword,
                
                handleSubmit, createUser, updateUser, deleteUser, allUser, listUser, hideUsers,

                searchRol, searchEmail, resetSearchRole, resetSearchEmail, setUser, user, clean,
                updateUserProfile
            }}>
            {props.children}
        </UserContext.Provider>
    )
}
