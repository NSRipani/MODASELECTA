import './panelUser.css'
import React, { useEffect, useState } from "react"
import { Toaster } from 'sonner';
import { useUserContext } from '../../../context/userContext.jsx';
import useNavigation from '../../../navigatePage/navigatePage.jsx';
import { RiUserAddLine, RiListView } from "react-icons/ri";
import { BiHide } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { MdCleaningServices, MdDeleteForever } from 'react-icons/md';
import { FaUserEdit } from "react-icons/fa";

const PanelUser = () => {
    const [editId, setEditId] = useState(null);

    const { roles, setRoles, email, setEmail, user, setUser,
        updateUser, allUser, deleteUser, listUser, hideUsers,
        searchEmail, searchRol, resetSearchRole, resetSearchEmail, clean
    } = useUserContext();

    const { navigateTo } = useNavigation();

    const icon = {color: 'white', fontSize: '1.5rem'}
    console.log('edit', editId)

    useEffect(() => {
        if (listUser.length === 0) {
            allUser();
        }
    }, [listUser, allUser]);

    const handle = (e) => {
        const { name, value } = e.target;
        setUser({ [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            updateUser(editId, user); // Edita el usuario seleccionado
            setEditId(null); // Limpia el estado de edición
            setUser({ first_name: '', last_name: '', age: 0, email: '', role: '' });
        }
    };
    return (
        <div className="user-conteiner">
            <h1 id="text">Gestión de usuarios</h1>
            <div className='container-panel1'>
                <div className="user-form-container">
                    <div className="user-form-subtitle">
                        <h3>Editar usuarios</h3>
                    </div>
                    <div className="form-body ">
                        <form onSubmit={handleSubmit} className="formluario">
                            <div className="form-group">
                                <label htmlFor="first-name">Nombre:</label>
                                <input type="text" id="first_name" className="form-control" name="first_name" value={user.first_name} onChange={handle}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last-name">Apellido:</label>
                                <input type="text" id="last_name" className="form-control" name="last_name" value={user.last_name} onChange={handle}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Edad:</label>
                                <input type="number" id="age" className="form-control"  name="age" value={user.age} onChange={handle}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" className="form-control" name="email" placeholder='ejemplo@hotmail.com' value={user.email} onChange={handle}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Rol:</label>
                                <input type="text" id="role" className="form-control"  name="role" placeholder='User o Admin' value={user.role} onChange={handle}/>
                            </div>
                            <div className="btns-user">
                                <button type="submit" className="success"><RiUserAddLine style={icon}/></button>
                                <button type="button" className="info" onClick={allUser}><RiListView style={icon}/></button>
                                <button type="button" className="ocultar-lista" onClick={hideUsers}><BiHide style={icon}/></button>
                                <button type="button" className="secondary" onClick={() => navigateTo('/admin')}><TbArrowBack style={icon}/></button>
                                <button type="button" className="clean" onClick={clean}><MdCleaningServices style={icon}/></button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* buscador */}
                <div className="buscador">
                    <div className='bus-conter'>
                        <div className='rol'>
                            <p>Rol</p>
                            <select className='search1' value={roles} onChange={(e) => setRoles(e.target.value)}>
                                <option value="">Seleccionar rol...</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="premium">Premium</option>
                            </select>
                            <button onClick={searchRol}>Buscar</button>
                            <button onClick={resetSearchRole}>Reset</button>    
                        </div>
                        <div className='email'>
                            <p>Email</p>
                            <select value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Seleccionar email">
                                <option value="">Seleccionar email...</option>
                                {Array.isArray(listUser) && listUser?.length > 0 &&
                                    listUser?.map((u) => (
                                        <option key={u.id || u.email} value={u.email}>
                                            {u.email}
                                        </option>
                                    ))}
                            </select>
                            <button onClick={searchEmail}>Buscar</button>
                            <button onClick={resetSearchEmail}>Reset</button> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h3>Lista de usuarios</h3>
                </div>
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
            </div>
            <Toaster/>
        </div>
    );
}

export default PanelUser;
