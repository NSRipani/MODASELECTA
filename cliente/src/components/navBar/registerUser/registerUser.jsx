import React, { useState } from 'react';
import './registerUser.css';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
// import { useNotification } from '../../../context/notificationContext.jsx';
import { useUserContextOptimized } from '../../../context/userContextOptimized.jsx';
// import { errorRegistro, successRegistro } from '../../message/message.jsx';

const RegisterUser = () => {
    // const user = { first_name: '', last_name: '', email: '', age: 0, password: '', role: '' }
    // const [user, setFormData] = useState(user);
    const { user, setUser, registerUser } = useUserContextOptimized();
    // const { success, error } = useNotification();
    const navigate = useNavigate();

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setUser({...user, [name]: value });
    // };
    const redict = async () => {
        if (await registerUser(user)){
            navigate('/users/login')
        }
    };
    // if (registerUser) {
    //     navigate('/users/login')
    // }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:8000/api/users/register', user);
    //         if (response.status === 201) {
    //             setFormData(user);
    //             success(`¡ ${user.first_name} tu registro fue exitoso !`);
    //             navigate('/users/login')
    //         }
    //     } catch (error) {
    //         console.error('Error al registrar el usuario:', error.response);
    //         error('Error al registrar el usuario. Corrobore los datos');
    //     }
    // };

    return (
        <div className="register-container">
            <div className="register-left">
                <div className="register-welcome">
                    <h1>Únete a Nuestra Comunidad de Moda</h1>
                    <p>Descubre las últimas tendencias en indumentaria, accede a ofertas exclusivas y personaliza tu experiencia de compra.</p>
                    <div className="register-features">
                        <div className="feature-item">
                            <span className="feature-icon">👕</span>
                            <span>Variedad de estilos</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🚚</span>
                            <span>Envío gratuito</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">💳</span>
                            <span>Pagos seguros</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="register-right">
                <div className="register-form-container">
                    <div className="register-header">
                        <h2>Crear Cuenta</h2>
                        <p>Completa tus datos para comenzar</p>
                    </div>
                    <form onSubmit={registerUser} className="register-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="first_name">Nombre</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="first_name"
                                    name="first_name"
                                    placeholder="Tu nombre"
                                    value={user.first_name.trim()}
                                    onChange={(e) => setUser({ ...user, first_name: e.target.value.trim() })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Apellido</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Tu apellido"
                                    value={user.last_name.trim()}
                                    onChange={(e) => setUser({ ...user, last_name: e.target.value.trim() })}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                required
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="tu@email.com"
                                value={user.email.trim()}
                                onChange={(e) => setUser({ ...user, email: e.target.value.trim() })}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="age">Edad</label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    id="age"
                                    name="age"
                                    placeholder="25"
                                    value={user.age}
                                    onChange={(e) => setUser({ ...user, age: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    required
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Tu contraseña"
                                    value={user.password.trim()}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="password-requirements">
                            <small>
                                La contraseña debe tener:
                                <ul>
                                    <li>Al menos una letra</li>
                                    <li>Al menos un número</li>
                                    <li>Al menos un símbolo especial</li>
                                    <li>Mínimo 8 caracteres</li>
                                </ul>
                            </small>
                        </div>
                        <button type="submit" className="btn-register" onClick={redict}>Crear Cuenta</button>
                    </form>
                    <div className="register-footer">
                        <p>¿Ya tienes una cuenta? <a href="/users/login">Inicia sesión</a></p>
                    </div>
                </div>
                <Toaster />
            </div>
        </div>
    );
};

export default RegisterUser;