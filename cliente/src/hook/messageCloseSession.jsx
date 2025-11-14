import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { estilo, botonNO, botonSI, fondo } from '../components/message/style/style.jsx';
import { useUserContext } from '../context/userContext.jsx';

export const useCloseSession = () => {
    const { handleLogout } = useUserContext();
    const navigate = useNavigate();

    const confirmLogout = () => {

        toast((t) => (
            <div style={{textAlign: 'center'}}>
                <p>¿Estás seguro de que deseas cerrar sesion?</p>
                <div style={estilo}>
                    <button style={botonSI} onClick={() => {toast.dismiss(t); 
                        handleLogout();
                        navigate('/users/login');}}>Sí</button>
                    <button style={botonNO} onClick={() => toast.dismiss(t)}>No</button>
                </div>
            </div>
        ),
        { duration: Infinity, position: "top-center", style: fondo, })       
    };
    return confirmLogout
}
export default useCloseSession;