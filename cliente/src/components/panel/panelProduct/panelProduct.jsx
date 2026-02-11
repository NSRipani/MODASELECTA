import { useEffect, useState } from 'react';
import { BiHide } from 'react-icons/bi';
import { TbArrowBack } from 'react-icons/tb';
import { MdCleaningServices, MdDeleteForever, MdModeEdit } from "react-icons/md";
import { RiAddLargeLine, RiListView } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Toaster } from 'sonner';
import { useProdContext } from '../../../context/prodContext.jsx';
import './panelProduct.css'
import { useNotification } from './../../../context/notificationContext.jsx';

const PanelProduct = () => {
    const [editIdProd, setEditIdProd] = useState(null);
    const [stockEdit, setStockEdit] = useState('');
    const [editStockId, setEditStockId] = useState(null);

    const { 
        prod, setProd, listProduct, allProd, 
        createProd, updateProd, deleteProd, hideListProd, resetList, 
        searchCategory, setSearchCategory, searchTitle, setSearchTitle, prodTitle, prodCategory, 
        resetSearch, updateStock, createMockProducts
    } = useProdContext()


    const notify = useNotification();

    const icon = {color: 'white', fontSize: '1.5rem'}
    
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
            notify.success('Producto actualizado');
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
        notify.success('Stock actualizado');
    };

    const searchProductsCategory = async () => {
        if (!searchCategory) { notify.error('Selecciona una categoría'); return; }
        await prodCategory();
        notify.success('Búsqueda realizada');
    }
    const searchProductsTitle = () => {
        (async () => {
            if (!searchTitle) { notify.error('Ingresa un título'); return; }
            await prodTitle();
            notify.success('Búsqueda realizada');
        })();
    }
    return (
        <div className="panel-container">
            <div className='coteiner-panel-product'>
                <div className="product-form-container">
                    <div className="form-header" >
                        <form onSubmit={handleSubmitProd} className="product-form" encType="multipart/form-data" noValidate>
                            <fieldset>
                                <legend id='title'>{editIdProd ? 'Editar Producto' : 'Agregar Nuevo Producto'}</legend>
                                    
                                <div className="form-group-prod">
                                    <label htmlFor="title">Título:</label>
                                    <input type="text" id="productName" name="title" value={prod.title} onChange={handle}/>
                                </div>
                                <div className="form-group-prod">
                                    <label htmlFor="photo">Foto:</label>
                                    <input type="file" id="productImage" name="photo" accept="image/*" onChange={handle} />
                                </div>
                                <div className="form-group-prod">
                                    <label htmlFor="category">Categoría:</label>
                                    <select id="productCategory" name="category" value={prod.category} onChange={handle}>
                                        <option value="">Selecciona una categoría</option>
                                        <option value="Abrigos">Abrigos</option>
                                        <option value="Articulo">Articulo</option>
                                        <option value="Zapatos">Zapatos</option>
                                        <option value="Zapatillas">Zapatillas</option>
                                    </select>
                                </div>
                                <div className="form-group-prod">
                                    <label htmlFor="price">Precio:</label>
                                    <input type="number" id="productPrice" name="price" value={prod.price} onChange={handle}/>
                                </div>
                                <div className="form-group-prod">
                                    <label htmlFor="stock">Stock:</label>
                                    <input type="number" id="productStock" name="stock" value={prod.stock} onChange={handle}/>
                                </div>
                                <div className="prod-buttons">
                                    <button type="submit" className="btn-save"><RiAddLargeLine style={icon}/></button>
                                    <button type="button" className="btn-list" onClick={allProd}><RiListView style={icon}/></button>
                                    <button type="button" className="ocultar-lista" onClick={hideListProd}><BiHide style={icon}/></button>
                                    {/* <button type="button" className="volverAdmin" onClick={() => navigateTo('/admin')}><TbArrowBack style={icon}/></button> */}
                                    <button type="button" className="btn-clear" onClick={resetList}><MdCleaningServices style={icon}/></button>
                                    <button type="button" className="btn-mock" onClick={createMockProducts}>Productos Mock</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            
                {/* Buscador */}
                <div className="search-container-gral-prod">
                    <div className="search-container-second-prod">
                        <fieldset>
                            <legend id='title'>Buscar productos</legend>
                            <div className="buscador-prod">
                                <label>Categoría</label>
                                <select className='select-category' value={listProduct} onChange={(e) => setSearchCategory(e.target.value)}>
                                    <option value="">Seleccionar categoría...</option>
                                    
                                    <option value="Abrigos">Abrigos</option>
                                    <option value="Articulo">Artículo</option>
                                    <option value="Zapatos">Zapatos</option>
                                    <option value="Zapatillas">Zapatillas</option>
                                </select>
                                <button onClick={searchProductsCategory}>Buscar</button>
                                <button onClick={resetSearch}>Reset</button>
                            </div>
                            <div className="buscador-prod"> 
                                <label>Título</label>
                                <input type="text" placeholder="Buscar por título..." value={searchTitle}
                                    onChange={(e) => setSearchTitle(e.target.value)} />
                                <button onClick={searchProductsTitle}>Buscar</button>
                                <button onClick={resetSearch}>Reset</button>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            {/* Tabla de productos */}
            <div className="product-list-container">
                <div className="list-header">
                    <fieldset>
                        <legend id='title'>Lista de productos</legend>
                        { (searchCategory || searchTitle) && (
                            <div className="active-filter" style={{marginBottom: "15px"}}>
                                {searchCategory && <span>Filtrado por categoría: <strong>{searchCategory}</strong></span>}
                                {searchTitle && <span style={{marginLeft: '1rem'}}>Filtrado por título: <strong>{searchTitle}</strong></span>}
                            </div>
                        )}
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
                                                    <div className='btns-edit'>
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
                    </fieldset>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default PanelProduct;
