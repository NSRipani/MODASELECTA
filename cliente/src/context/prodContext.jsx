import React, { createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios';
import { errorMessag, info, success } from '../components/message/message.jsx';
import { botonNO, botonSI, estilo, fondo } from '../components/message/style/style.jsx';
import { toast } from 'sonner';

const ProdContext = createContext();

export const useProdContext = () => useContext(ProdContext);

export const ProdProvider = (props) => {
    
    const [prod, setProd] = useState({ title: '', photo: '', category: '', price: 0, stock: 0 });
    const [listProduct, setListProduct] = useState([])
    const [searchField, setSearchField] = useState("category"); 
    const [searchTerm, setSearchTerm] = useState("");

    const rute = 'http://localhost:8000/api/products';

    
    const allProd = async () => {
        try {
            const response = await axios.get(`${rute}`, { withCredentials: true });
            console.log('PRODUCTO', response.data.response) 

            if (response.status === 200) {
                setListProduct(response.data.response);
                success('¡Lista de productos!')
            }
        } catch (error) {
            console.error('Error al obtener los productos:', error.response);
            errorMessag('Error al mostrar productos.');
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
                success('¡Producto registrado!')
                setProd({ title: '', photo: '', category: '', price: 0, stock: 0 });
                setListProduct(response.data)
            }
            console.log(`LLLLLLL ${listProduct}`)
        } catch (error) {
            console.error('Error al registrar el producto:', error.response);
            errorMessag('Error al registrar el producto. Corrobore los datos');
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
            errorMessag('Error al buscar el producto por ID.');
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
                success('¡Producto actualizado con éxito!');
                setListProduct((prevList) =>
                    prevList.map((product) =>
                        product.id === id ? { ...product, ...data } : product
                    )
                );
            }
            setProd({ title: '', photo: '', category: '', price: 0, stock: 0 });
        } catch (error) {
            errorMessag('Error al actualizar el producto.');
            console.error(`Error al actualizar el producto:`, error);
        }
    };

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
            error('ID de producto no válido')
            return;
        }
        const eliminarProducto = async () => {
            try {
                const response = await axios.delete(`${rute}/${id}`, { withCredentials: true });        
                if (response.status === 200) {
                    success('¡Producto eliminado!')
                    setListProduct((prevList) => prevList.filter((product) => product.id !== id));
                }
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                errorMessag('Error al eliminar el producto.')
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
        success('Lista de productos oculta.');
    };

    const resetList = () => {
        setProd({ title: '', photo: '', category: '', price: 0, stock: 0 });
    }

    // --- Buscador conectado al backend ---
    const handleSearch = async () => {
        try {
            let url = "";
            if (searchField === "category") {
                url = `http://localhost:8000/api/products/filter?category=${searchTerm}`;
            } else if (searchField === "title") {
                url = `http://localhost:8000/api/products/title?title=${searchTerm}`;
            }

            const res = await axios.get(url, { withCredentials: true });
            if (res.status === 200) {
                setListProduct(res.data.products || []); // ajusta según tu backend
            }
        } catch (error) {
            console.error("Error en búsqueda:", error);
        }
    };

    const resetSearch = () => {
        setSearchTerm("");
        allProd(); // vuelve a traer todos los productos
    };

    const updateStock = async (id, newStock) => {
        try {
            const res = await axios.patch(`${rute}/${id}/stock`, { stock: newStock }, { withCredentials: true });
            setListProduct(res.data)
            console.log('STOCK: ', res.data)
            // refrescar lista
            allProd();
        } catch (error) {
            errorMessag('Error al actualizar stock');
            console.error("Error al actualizar stock", error);
        }
    };

    // Ejemplo con Axios:
    const createMockProducts = async () => {
        try {
            const response = await axios.post(`${rute}/mocks`);
            setListProduct(response.data.created);
            console.log(`MOKS. PRODUCTOS: ${response.data}`)
            success('Productos agregados')
        } catch (error) {
            console.error(error);
            errorMessag('Error al crear productos de prueba');
        }
    };


    return(
        <ProdContext.Provider value={
                {
                    prod, setProd, listProduct, allProd, createProd, updateProd, deleteProd, hideListProd, resetList,
                    searchField, setSearchField, searchTerm, setSearchTerm, handleSearch, resetSearch, updateStock,
                    getProductById, findProductByIdLocal, createMockProducts
                }
            }>
            {props.children}
        </ProdContext.Provider>
    )
}