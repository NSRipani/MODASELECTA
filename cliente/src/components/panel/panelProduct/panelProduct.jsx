import { useState } from 'react';
import { BiHide } from 'react-icons/bi';
import { TbArrowBack } from 'react-icons/tb';
import { MdCleaningServices, MdDeleteForever, MdModeEdit } from "react-icons/md";
import { RiAddLargeLine, RiListView } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Toaster } from 'sonner';
import { useProdContext } from '../../../context/prodContext.jsx';
import useNavigation from '../../../navigatePage/navigatePage.jsx';
import './panelProduct.css'

const PanelProduct = () => {
    const [editIdProd, setEditIdProd] = useState(null);
    const [stockEdit, setStockEdit] = useState('');
    const [editStockId, setEditStockId] = useState(null);

    const { prod, setProd, listProduct,  createProd, updateProd, deleteProd, 
        allProd, hideListProd, resetList,searchField, setSearchField, searchTerm, 
        setSearchTerm, handleSearch, resetSearch, updateStock, createMockProducts
    } = useProdContext()

    const { navigateTo } = useNavigation();
    
    const icon = {color: 'white', fontSize: '1.5rem'}
    const boton = { height: 'min-content', padding: '10px', border: 'none', 
        borderRadius: '10px', cursor: 'pointer', backgroundColor: '#eb841e'
    }
    const handle = (e) => {
        const { name, value, files } = e.target;
        if (name === "photo") {
            setProd({ ...prod, photo: files[0] }); // archivo
        } else {
            setProd({ ...prod, [name]: value }); // texto, números, etc.
        }
    };

    const handleSubmitProd = (e) => {
        e.preventDefault();
        if (editIdProd) {
            updateProd(editIdProd, prod); // Edita el usuario seleccionado
            setEditIdProd(null); // Limpia el estado de edición
        } else {
            createProd(e, prod); // Crea un nuevo usuario
        }
        e.target.reset(); // limpia el input file también
    };

    const handleStockUpdate = async (id) => {
        if (!stockEdit) return;
        await updateStock(id, Number(stockEdit)); // Llama al contexto
        setStockEdit('');
        setEditStockId(null);
    };

    return (
        <div className="panel-container">
            <h1 id="panel-title">Gestión de Productos</h1>
            <div className='coteiner-panel-product'>
                <div className="product-form-container">
                    <div className="form-header" style={{display: 'flex', alignItems: 'center', gap: '50px'}}>
                        <h3>Agregar o editar producto</h3>
                        <button style={boton} onClick={createMockProducts}>  
                            Generar productos de prueba 
                        </button>
                    </div>
                    <div className="form-body">
                        <form onSubmit={handleSubmitProd} id="product-form" encType="multipart/form-data" noValidate>
                            <div className="form-group">
                                <label htmlFor="title">Título:</label>
                                <input type="text" id="productName" name="title" value={prod.title} onChange={handle}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="photo">Foto:</label>
                                <input type="file" id="productImage" name="photo" accept="image/*" onChange={handle} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Categoría:</label>
                                <select id="productCategory" name="category" value={prod.category} onChange={handle}>
                                    <option value="">Selecciona una categoría</option>
                                    <option value="Abrigos">Abrigos</option>
                                    <option value="Articulo">Articulo</option>
                                    <option value="Zapatos">Zapatos</option>
                                    <option value="Zapatillas">Zapatillas</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Precio:</label>
                                <input type="number" id="productPrice" name="price" value={prod.price} onChange={handle}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock">Stock:</label>
                                <input type="number" id="productStock" name="stock" value={prod.stock} onChange={handle}/>
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="btn-save"><RiAddLargeLine style={icon}/></button>
                                <button type="button" className="btn-list" onClick={allProd}><RiListView style={icon}/></button>
                                <button type="button" className="ocultar-lista" onClick={hideListProd}><BiHide style={icon}/></button>
                                <button type="button" className="volverAdmin" onClick={() => navigateTo('/admin')}><TbArrowBack style={icon}/></button>
                                <button type="button" className="btn-clear" onClick={resetList}><MdCleaningServices style={icon}/></button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Buscador */}
                <div className="buscador-prod">
                    <select className='seleccion' value={searchField} onChange={(e) => setSearchField(e.target.value)}>
                        <option value="category">Categoría</option>
                        <option value="title">Título</option>
                    </select>
                    {searchField === "category" ? (
                    <select className='select-category' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}>
                        <option value="">Seleccionar categoría...</option>
                        <option value="Abrigos">Abrigos</option>
                        <option value="Articulo">Artículo</option>
                        <option value="Zapatos">Zapatos</option>
                        <option value="Zapatillas">Zapatillas</option>
                    </select>
                    ) : (
                    <input type="text" placeholder="Buscar por título..." value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    )}
                    <button onClick={handleSearch}>Buscar</button>
                    <button onClick={resetSearch}>Reset</button>
                </div>
            </div>

            {/* Tabla de productos */}
            <div className="product-list-container">
                <div className="list-header">
                    <h3>Lista de Productos</h3>
                </div>
                <div className="list-body">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Imagen</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listProduct?.length > 0 ? (
                                listProduct.map((prod) => (
                                <tr key={prod.id}>
                                    <td>{prod.id}</td>
                                    <td>{prod.title}</td>
                                    <td><img className='imagen' src={prod?.photo} alt={prod?.title} width="50px" /></td>
                                    <td>{prod.category}</td>
                                    <td>{prod.price}</td>
                                    <td className='td-cel-stock'>{editStockId === prod.id ? (
                                        <div className='cel-stock'>
                                            <input type="number" value={stockEdit} onChange={e => setStockEdit(e.target.value)} />
                                            <div className='btn-edit'>
                                                <button  id='save' onClick={() => handleStockUpdate(prod.id)}>Guardar</button>
                                                <button  id='cancel' onClick={() => { setEditStockId(null); setStockEdit(''); }}>Cancelar</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='icon-edit'>
                                            {prod.stock} <button  id='edite' onClick={() => { setEditStockId(prod.id); setStockEdit(prod.stock); }} title="Editar stock"><FiEdit /></button>
                                        </div>
                                    )}
                                    </td>
                                    <td className='edition'>
                                        <button className='update' id='update'  onClick={() => { setProd(prod); setEditIdProd(prod.id) }}><MdModeEdit /></button>
                                        <button className='delet' id='delet' onClick={() => deleteProd(prod.id)}><MdDeleteForever /></button>
                                    </td>
                                </tr>
                            ))) : (
                                <tr>
                                    <td className='sin-productos' colSpan="7">No hay productos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default PanelProduct;
