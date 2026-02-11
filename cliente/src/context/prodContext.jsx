import React, { createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios';
import { errorMessag, info, success } from '../components/message/message.jsx';
import { botonNO, botonSI, estilo, fondo } from '../components/message/style/style.jsx';
import { toast } from 'sonner';
import { useNotification } from './notificationContext.jsx';

const ProdContext = createContext();

export const useProdContext = () => useContext(ProdContext);

export const ProdProvider = (props) => {
    
    const [prod, setProd] = useState({ title: '', photo: '', category: '', price: 0, stock: 0 });
    const [listProduct, setListProduct] = useState([])
    const [searchCategory, setSearchCategory] = useState([]); 
    const [searchTitle, setSearchTitle] = useState([]);

    const rute = 'http://localhost:8000/api/products';

    const notify = useNotification();

    const allProd = async () => {
        try {
            const response = await axios.get(`${rute}`, { withCredentials: true });
            console.log('PRODUCTO', response.data.response) 

            if (response.status === 200) {
                setListProduct(response.data.response);
                notify.success('¡Lista de productos!')
            }
        } catch (error) {
            console.error('Error al obtener los productos:', error.response);
            notify.error('Error al mostrar productos.');
        }
    };

    const createProd = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post(`${rute}/create`, prod, {
                headers:{ "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            if (response.status === 201) {
                notify.success('¡Producto registrado!')
                setProd({ title: '', photo: '', category: '', price: 0, stock: 0 });
                setListProduct(response.data)
            }
            console.log(`LLLLLLL ${listProduct}`)
        } catch (error) {
            console.error('Error al registrar el producto:', error.response);
            notify.error('Error al registrar el producto. Corrobore los datos');
        }
    };

    const findProductByIdLocal = (id) => {
        return listProduct.find(product => product.id === id) || null;
    };
    // Buscar producto por ID
    const getProductById = async (id) => {
        try {
            const response = await axios.get(`${rute}/${id}`);
            if (response.status === 200 ) {
                console.log('Producto encontrado:', response.data.response);
                return response.data.response  ;
            } 
        } catch (error) {
            notify.error('Error al buscar el producto por ID.');
            console.error('Error al buscar producto por ID:', error);
            return null;
        }
    };

    // Actualización parcial: solo envía los campos modificados
    const updateProd = async (id, data) => {
        try {
            const response = await axios.patch(`${rute}/${id}`, data, { 
                withCredentials: true, 
                headers: { "Content-Type": "multipart/form-data" }, 
            });
            if (response.status === 200) {
                notify.success('¡Producto actualizado con éxito!');
                setListProduct((prevList) =>
                    prevList.map((product) =>
                        product.id === id ? { ...product, ...data } : product
                    )
                );
            }
            setProd({ title: '', photo: '', category: '', price: 0, stock: 0 });
        } catch (error) {
            notify.error('Error al actualizar el producto.');
            console.error(`Error al actualizar el producto:`, error);
        }
    };

    // no utilizado
    const updateProductStock = async (id, nuevoStock) => {
        try {
            const response = await axios.patch(`${rute}/${id}/stock`,
                { stock: nuevoStock },
                { withCredentials: true }
            );
            if (response.status === 200) {
                // Stock actualizado correctamente
                console.log(response.data)
                return response.data;
            }
        } catch (error) {
            console.error(`Error al actualizar el stock: ${error}`);
            errorMessag('Error al actualizar el stock.');
        }
    };

    const deleteProd = async (id) => {
        if (!id) {
            notify.error('ID de producto no válido')
            return;
        }
        const eliminarProducto = async () => {
            try {
                const response = await axios.delete(`${rute}/${id}`, { withCredentials: true });        
                if (response.status === 200) {
                    notify.success('¡Producto eliminado!')
                    setListProduct((prevList) => prevList.filter((product) => product.id !== id));
                }
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                notify.error('Error al eliminar el producto.')
            }
        };
        toast((t) => (
                <div style={{textAlign: 'center'}}>
                    <p>¿Deseas eliminar este producto?</p>
                    <div style={estilo}>
                        <button style={ botonSI } onClick={async () => {toast.dismiss(t); await eliminarProducto(id);}}>Sí</button>
                        <button style={ botonNO } onClick={() => toast.dismiss(t)}>No</button>
                    </div>
                </div>
            ),{ duration: Infinity, position: "top-center", style: fondo, }
        );
    }
    
    const hideListProd = () => {
        setListProduct([]);
        notify.success('Lista de productos oculta.');
    };

    const resetList = () => {
        setProd({ title: '', photo: '', category: '', price: 0, stock: 0 });
    }

    // --- Buscador conectado al backend ---
    const prodCategory = async () => {
        if (!searchCategory) return; // evita consultas vacías
        try {
            const res = await axios.get(`${rute}/filter?category=${searchCategory}`, { withCredentials: true });
            if (res.status === 200) {
                // Asumimos que el backend devuelve { products: [...] }
                // setSearchCategory(res.data.products.map(p => p.category) || []);
                setListProduct(res.data.products || []);
                console.log('ListProductCategory: ', res.data.products)
                console.log('Category: ', res.data.products.map(p => p.category) )
            }
        } catch (error) {
            console.error("Error en búsqueda por categoría:", error);
        }
    };

    const prodTitle = async () => {
        if (!searchTitle) return; // evita consultas vacías
        try {
            const res = await axios.get(`${rute}/title?title=${searchTitle}`, { withCredentials: true });   
            if (res.status === 200) {
                // Asumimos que el backend devuelve { products: [...] }
                setSearchTitle(res.data.products || []);
                console.log('ListProductTitle: ', res.data.products)
            }
        } catch (error) {
            console.error("Error en búsqueda por título:", error);
        }
    };

    const resetSearch = () => {
        setSearchTitle([]);
        setSearchCategory([]);
    };

    const updateStock = async (id, newStock) => {
        try {
            const res = await axios.patch(`${rute}/${id}/stock`, { stock: newStock }, { withCredentials: true });
            setListProduct(res.data)
            console.log('STOCK: ', res.data)
            // refrescar lista
            // allProd();
        } catch (error) {
            notify.error('Error al actualizar stock');
            console.error("Error al actualizar stock", error);
        }
    };

    // Ejemplo con Axios:
    const createMockProducts = async () => {
        try {
            const response = await axios.post(`${rute}/mocks`);
            setListProduct(response.data.created);
            console.log(`MOKS. PRODUCTOS: ${response.data}`)
            notify.success('Productos agregados')
        } catch (error) {
            console.error(error);
            notify.error('Error al crear productos de prueba');
        }
    };


    return(
        <ProdContext.Provider value={
                {
                    prod, setProd, listProduct, allProd, createProd, updateProd, deleteProd, hideListProd, resetList,
                    searchCategory, setSearchCategory, prodCategory, 
                    searchTitle, setSearchTitle, prodTitle, resetSearch, 
                    updateStock, getProductById, findProductByIdLocal, createMockProducts
                }
            }>
            {props.children}
        </ProdContext.Provider>
    )
}