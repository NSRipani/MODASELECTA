import './panelUser.css'
import React, { useEffect, useState } from "react"
import { Toaster } from 'sonner';
import useNavigation from '../../../navigatePage/navigatePage.jsx';
import { RiUserAddLine, RiListView } from "react-icons/ri";
import { BiHide } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { MdCleaningServices, MdDeleteForever } from 'react-icons/md';
import { FaUserEdit } from "react-icons/fa";
import { useAuthContext } from '../../../context/authContext.jsx';
import { useUserContextOptimized } from '../../../context/userContextOptimized.jsx';
import { success } from '../../message/message.jsx';
import { useNotifications } from '../../../hook/useNotifications.jsx';

const PanelUser = () => {
    const [editId, setEditId] = useState(null);

    const { user, setUser, updateUser, allUser, deleteUser, listUser, hideUsers,
        searchEmail, searchRol, resetSearchRole, resetSearchEmail, clean
    } = useUserContextOptimized();
    const { role, setRole, email, setEmail } = useAuthContext();

    const notify = useNotifications();
    const btnAllUsers = async () => {
        await allUser();
        if (allUser) {
            notify.success('¡Lista de usuarios!');
        }
    }

    const btnRole = async () => {
        // setRole(role);
        await searchRol();
        if (searchRol) {
            notify.success('Usuarios filtrados por rol');
        }
    };

    const icon = {color: 'white', fontSize: '1.5rem'}
    console.log('edit', editId)

    
    const handle = (e) => {
        const { name, value } = e.target;
        setUser({ [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            updateUser(editId, user); // Edita el usuario seleccionado
            notify.success('Usuario actualizado con éxito.');
            setEditId(null); // Limpia el estado de edición
            setUser({ first_name: '', last_name: '', age: 0, email: '', role: '' });
        }
    };
    // const btnHideUsers = () => {
    //     if (hideUsers()) {
    //         notify.success('Lista de usuarios oculta.');
    //     }
    // }
    return (
        <div className="user-conteiner">
            <div className='container-panel1'>
                <div className="user-form-container">
                    <div className="form-body ">
                        <form onSubmit={handleSubmit} className="formluario-user">
                            <fieldset>
                                <legend id="text">Gestión de usuarios</legend>
                                <div className="form-group-user">
                                    <label htmlFor="first-name">Nombre:</label>
                                    <input type="text" id="first_name" className="form-control" name="first_name" value={user.first_name} onChange={handle}/>
                                </div>
                                <div className="form-group-user">
                                    <label htmlFor="last-name">Apellido:</label>
                                    <input type="text" id="last_name" className="form-control" name="last_name" value={user.last_name} onChange={handle}/>
                                </div>
                                <div className="form-group-user">
                                    <label htmlFor="age">Edad:</label>
                                    <input type="number" id="age" className="form-control"  name="age" value={user.age} onChange={handle}/>
                                </div>
                                <div className="form-group-user">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" className="form-control" name="email" placeholder='ejemplo@hotmail.com' value={user.email} onChange={handle}/>
                                </div>
                                <div className="form-group-user">
                                    <label htmlFor="role">Rol:</label>
                                    <input type="text" id="role" className="form-control"  name="role" placeholder='User o Admin' value={user.role} onChange={handle}/>
                                </div>
                                <div className="btns-user">
                                    <button type="submit" className="success"><RiUserAddLine style={icon}/></button>
                                    <button type="button" className="info" onClick={btnAllUsers}><RiListView style={icon}/></button>
                                    <button type="button" className="ocultar-lista" onClick={hideUsers}><BiHide style={icon}/></button>
                                    {/* <button type="button" className="secondary" onClick={() => navigateTo('/admin')}><TbArrowBack style={icon}/></button> */}
                                    <button type="button" className="clean" onClick={clean}><MdCleaningServices style={icon}/></button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
                {/* buscador */}
                <div className="buscador">
                    <div className='bus-conter'>
                        <fieldset>
                            <legend id="s">Buscar usuarios</legend>
                            <div className='rol'>
                                <p>Rol</p>
                                <select className='search1' value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Seleccionar rol...</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="premium">Premium</option>
                                </select>
                                <button onClick={btnRole}>Buscar</button>
                                <button onClick={resetSearchRole}>Reset</button>    
                            </div>
                            <div className='email'>
                                <p>Email</p>
                                <select value={listUser.email} onChange={(e) => setEmail(e.target.value)} >
                                    <option value="">Seleccionar email...</option>
                                    {Array.isArray(listUser) && listUser?.length > 0 &&
                                        listUser?.map((u) => (
                                            <option key={u.id} value={u.email}>
                                                {u.email}
                                            </option>
                                        ))}
                                </select>
                                <button onClick={searchEmail}>Buscar</button>
                                <button onClick={resetSearchEmail}>Reset</button> 
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <fieldset>
                        <legend>Lista de usuarios</legend>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Correo</th>
                                        <th>Edad</th>
                                        <th>Rol</th>
                                        <th colSpan="2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listUser && listUser?.length > 0 ?
                                        ( listUser?.map((u) => (
                                            <tr key={u.id}>
                                                <td>{u.id}</td>
                                                <td>{u.first_name}</td>
                                                <td>{u.last_name}</td>
                                                <td>{u.email}</td>
                                                <td>{u.age}</td>
                                                <td>{u.role}</td>
                                                <td className='btn-edition'>
                                                    <button className='btn-actualizar' onClick={() => { setUser(u); setEditId(u.id) } }><FaUserEdit /></button>
                                                    <button className='btn-eliminar' onClick={() => deleteUser(u.id)}><MdDeleteForever /></button>
                                                </td>
                                            </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className='sin-usuarios' colSpan="8">No hay usuarios disponibles</td>
                                            </tr>
                                        )}
                                    {/* listUser?.length === 0 &&  */}
                                </tbody>
                            </table>
                        </div>
                    </fieldset>
                </div>
            </div>
            <Toaster/>
        </div>
    );
}

export default PanelUser;
