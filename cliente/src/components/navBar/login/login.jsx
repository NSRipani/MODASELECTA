import './login.css';
import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/authContext.jsx';
import { FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa';

const Login = () => {

    const { login, setLogin, handleSubmit } = useAuthContext();

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Sección de bienvenida */}
                <div className="login-welcome">
                    <div className="welcome-content">
                        <h1>Bienvenido de vuelta</h1>
                        <p>Accede a tu cuenta para disfrutar de ofertas exclusivas, seguimiento de pedidos y mucho más.</p>
                        <div className="welcome-features">
                            <div className="feature">
                                <span className="feature-icon">🛍️</span>
                                <span>Compras rápidas</span>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">💳</span>
                                <span>Pagos seguros</span>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">🚚</span>
                                <span>Envío gratuito</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección del formulario */}
                <div className="login-form-section">
                    <div className="login-form-container">
                        <div className="login-header">
                            <h2>Iniciar Sesión</h2>
                            <p>Ingresa tus credenciales para continuar</p>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="email">Correo Electrónico</label>
                                <div className="input-wrapper">
                                    <FaUser className="input-icon" />
                                    <input
                                        required
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="tu@email.com"
                                        value={login.email}
                                        onChange={(e) => setLogin({ ...login, email: e.target.value.trim() })}
                                        aria-label="Correo Electrónico"
                                        aria-required="true"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <div className="input-wrapper">
                                    <FaLock className="input-icon" />
                                    <input
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        placeholder="Tu contraseña"
                                        value={login.password}
                                        onChange={(e) => setLogin({ ...login, password: e.target.value.trim() })}
                                        aria-label="Contraseña"
                                        aria-required="true"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={togglePasswordVisibility}
                                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        id="rememberMe"
                                        aria-label="Recordar mi sesión"
                                    />
                                    <span className="checkmark"></span>
                                    Recordar mi sesión
                                </label>
                                <Link to="/password/forgot" className="forgot-password">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <button type="submit" className="login-btn">
                                Iniciar Sesión
                            </button>
                        </form>

                        <div className="login-footer">
                            <p>¿No tienes cuenta? <Link to="/users/register">Regístrate aquí</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Login;
//                     <p>Si no ha registrado su cuenta, puede<a href="/users/register" aria-label="Registrarse aquí">Registrarse aquí</a></p>
//                 </div>
//             </div>
//             <Toaster />
//         </div>
//     );
// };

// export default Login;
