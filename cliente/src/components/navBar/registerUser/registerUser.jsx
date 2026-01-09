import React, { useState } from 'react';
import './registerUser.css';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { errorRegistro, successRegistro } from '../../message/message.jsx';

const RegisterUser = () => {
    const user = { first_name: '', last_name: '', email: '', age: 0, password: '', role: '' }

    const [formData, setFormData] = useState(user);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users/register', formData);
            if (response.status === 201) {
                setFormData(user);
                successRegistro(`¡ ${formData.first_name} tu registro fue exitoso !`);
                navigate('/users/login')
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error.response);
            errorRegistro('Error al registrar el usuario. Corrobore los datos');
        }
    };

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
                    <form onSubmit={handleSubmit} className="register-form">
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
                                    value={formData.first_name.trim()}
                                    onChange={handleChange}
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
                                    value={formData.last_name.trim()}
                                    onChange={handleChange}
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
                                value={formData.email.trim()}
                                onChange={handleChange}
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
                                    value={formData.age}
                                    onChange={handleChange}
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
                                    value={formData.password.trim()}
                                    onChange={handleChange}
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
                        <button type="submit" className="btn-register">Crear Cuenta</button>
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