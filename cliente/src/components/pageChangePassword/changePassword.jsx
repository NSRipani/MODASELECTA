import React, { useState } from 'react';
import './changePassword.css';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { success, errorMessag } from '../message/message.jsx';

const ChangePassword = () => {
    const [step, setStep] = useState(1); 
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({ email: '', code: '', newPassword: '' });

    const [viewPassword, setViewPassword] = useState(false);

    const toggleViewPassword = () => setViewPassword(prev => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const ruteForgot = 'http://localhost:8000/api/password/forgot';
    const ruteReset = 'http://localhost:8000/api/password/reset';

    const sendCode = async (e) => {
        e.preventDefault();
        if (!form.email) {
            toast.error('Por favor, ingresa tu correo electrónico.');
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${ruteForgot}`, { email: form.email });
            if (res.status === 200) {
                success('Si el correo existe, se envió un código de verificación.');
                setStep(2);
            }
        } catch (err) {
            errorMessag('Error al enviar el código. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        const { email, code, newPassword } = form;

        if (!email || !code || !newPassword) {
            errorMessag('Completa todos los campos.');
            return;
        }

        if (newPassword.length < 8) {
            errorMessag('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${ruteReset}`, { email, code, newPassword });

            if (res.status === 200) {
                success('Tu contraseña fue actualizada correctamente.');
                setForm({ email: '', code: '', newPassword: '' });
                setStep(1);
            }
        } catch (err) {
            errorMessag('Código inválido o expirado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="change-password-user">
            <div className="title-contraseña">
                <h1>REESTABLECER CONTRASEÑA</h1>
            </div>

            <div className="form-container">
                <div className="form-wrapper">
                {step === 1 ? (
                    <form onSubmit={sendCode} className="form">
                        <div className="form-group">
                            <input type="email" className="form-control" name="email" placeholder="Correo electrónico" value={form.email}  onChange={handleChange} required />
                        </div>

                        <div className="boton-center">
                            <button type="submit" disabled={loading}> {loading ? 'Enviando...' : 'Enviar código'}</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={resetPassword} className="form">
                        <div className="form-group">
                            <input type="text" className="form-control" name="code" placeholder="Código recibido" value={form.code} onChange={handleChange}  required/>
                        </div>

                        <div className="form-group">
                            <input type={viewPassword ? 'text' : 'password'} className="form-control" name="newPassword" placeholder="Nueva contraseña" value={form.newPassword} onChange={handleChange} required/>
                        </div>

                        <div className="password1">
                            <i className={`fas ${viewPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-password-icon`} onClick={toggleViewPassword} aria-label={viewPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} role="button" tabIndex="0"></i>
                        </div>

                        <div className="boton-center">
                            <button type="submit" disabled={loading}>{loading ? 'Actualizando...' : 'Cambiar contraseña'}</button>
                        </div>

                        <p className="volver" onClick={() => setStep(1)}>← Volver a enviar código</p>
                    </form>
                )}
                </div>

                <Toaster />
            </div>
        </section>
    );
};

export default ChangePassword;

