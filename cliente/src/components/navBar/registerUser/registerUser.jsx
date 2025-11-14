import React, { useState } from 'react';
import './registerUser.css'; 
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom'; 
import { errorRegistro, successRegistro } from '../../message/message.jsx';

const RegisterUser = () => {
    const user = { first_name: '', last_name: '', email: '', age: 0, password: '', role: ''}

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
        <section>
            <div className='title-register'>
                <h1 >REGISTRO DE USUARIO</h1>
            </div>
            <div className="form-container-alt">
                <div className="form-wrapper-alt">
                    <form onSubmit={handleSubmit} className="modern-form">
                        <div className="form-group">
                            <input required type="text" className="form-control" id="first_name" name="first_name" placeholder="Nombre/s" value={formData.first_name.trim()} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input required type="text" className="form-control" id="last_name" name="last_name" placeholder="Apellido/s" value={formData.last_name.trim()} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input required type="email" className="form-control" id="email" name="email" placeholder="Email" value={formData.email.trim()} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input required type="number" className="form-control" id="age" name="age" placeholder="Edad" value={formData.age} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input required type="password" className="form-control" id="password" name="password" placeholder="Contraseña" value={formData.password.trim()} onChange={handleChange} />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn-register-alt">Registrar</button>
                        </div>
                    </form>
                    <div className="mt-3">
                        <div className='condition'>
                            <small className="password-requirements">
                                <ul>
                                    <li>Al menos una letra</li>
                                    <li>Al menos un número</li>
                                    <li>Al menos un símbolo especial</li>
                                    <li>Minimo 8 caracteres</li>
                                </ul>
                            </small>
                        </div>
                        <div className='inicio'>
                            <p>¿Ya tienes una cuenta? <a href="/users/login">Inicia sesión</a></p>
                        </div>
                    </div>
                </div>
                <Toaster />
            </div>
        </section>
    );
};

export default RegisterUser;