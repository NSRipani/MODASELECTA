import React, { useState } from 'react';
import './changePassword.css';
import { Toaster, toast } from 'sonner';
import { success, errorMessag } from '../message/message.jsx';
import { useUserContext } from '../../context/userContext.jsx';

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
    const { requestPasswordReset, resetPassword } = useUserContext();

    const sendCode = async (e) => {
        e.preventDefault();
        if (!form.email) {
            toast.error('Por favor, ingresa tu correo electrónico.');
            return;
        }
        setLoading(true);
        try {
            await requestPasswordReset(form.email);
            setStep(2);
        } catch (err) {
            errorMessag('Error al enviar el código. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
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
            await resetPassword(email, code, newPassword);
            success('Tu contraseña fue actualizada correctamente.');
            setForm({ email: '', code: '', newPassword: '' });
            setStep(1);
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
                    <form onSubmit={handleResetPassword} className="form">
                        <div className="form-group">
                            <input type="text" className="form-control" name="code" placeholder="Código recibido" value={form.code} onChange={handleChange}  required/>
                        </div>

                        <div className="form-group">
                            <input type={viewPassword ? 'text' : 'password'} className="form-control" name="newPassword" placeholder="Nueva contraseña" value={form.newPassword} onChange={handleChange} required/>
                        </div>

                        <div className="password3">
                            <i id='p3' className={`fas ${viewPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-password-icon`} onClick={toggleViewPassword} aria-label={viewPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} role="button" tabIndex="0"></i>
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

