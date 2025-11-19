import './login.css'; 
import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { Link } from 'react-router-dom';
import {useUserContext} from '../../../context/userContext.jsx';

const Login = () => {

    const { login, setLogin, handleSubmit } = useUserContext();
    
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };
    return (
        <div className="login-container">
            <div className="login-wrapper">
                <h1 className="text-center">Iniciar Sesión</h1>
                <form onSubmit={handleSubmit} >
                    <div className="input-box">
                        <i className="fas fa-user"></i>
                        <input required type="email" className="form-control" id="email" placeholder="Email" name="email" 
                        value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value.trim() })} 
                        aria-label="Correo Electrónico" aria-required="true" aria-invalid="false" aria-describedby="emailHelp"/>
                    </div>

                    <div className="input-box">
                        <i className="fas fa-lock"></i>
                        <input required type={showPassword ? 'text' : 'password'} className="form-control" id="password" placeholder="Contraseña" name="password" 
                        value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value.trim() })} 
                        data-val-required="El campo es obligatorio" aria-describedby="passwordHelp" aria-required="true" aria-invalid="false"/>
                    </div>
                    
                    <div className='ojo'>
                        <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-password-icon`} onClick={togglePasswordVisibility}
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} role="button" tabIndex="0" ></i>
                    </div>

                    <div className="form-group form-check">
                        <div className="checkbox-container">
                            <input type="checkbox" className="form-check-input" name='remember' id="rememberMe" aria-label="Recordar mi sesión"/>   
                            <label className="form-check-label" htmlFor="rememberMe">Recordar mi sesión</label>
                        </div>
                        <Link to={"/password/forgot"} aria-label="Cambiar contraseña">Cambiar contraseña</Link>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn-login" aria-label="Iniciar Sesión">Iniciar Sesión</button>
                    </div>
                </form>
                <div className="text-center-register">
                    <p>Si no ha registrado su cuenta, puede<a href="/users/register" aria-label="Registrarse aquí">Registrarse aquí</a></p>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Login;
