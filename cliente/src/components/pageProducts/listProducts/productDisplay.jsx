import './productDisplay.css';
import axios from 'axios';
import Loaders from '../loaders/loaders.jsx';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { useCarroContext } from '../../../context/cartContext.jsx';
import {useUserContext} from '../../../context/userContext.jsx';
import SubHeader from '../category/sub-nav.jsx';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";

const StarRating = ({ rating, onRatingChange }) => {
    const stars = [1, 2, 3, 4, 5]; // Estrellas del 1 al 5

    return (
        <div className="star-rating">
            {stars.map((star) => (
                <span 
                    key={star} 
                    className={`star ${star <= rating ? 'filled' : ''}`} 
                    onClick={() => onRatingChange(star)}
                >★</span>
            ))}
        </div>
    );
};

const ProductDisplay = () => {
    // const { jwt } = useUserContext();
    const { payload } = useUserContext();
    const { addToCart } = useCarroContext();

    const isLoggedIn = !!payload; // Si hay payload, usuario logueado
    
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filter, setFilter] = useState({ category: '', price: '' });
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [rating, setRating] = useState(0);

    // console.log('filteredProducts: ', filteredProducts)

    const fetchProducts = async (page = 1) => {
        try {
            const [minPrice, maxPrice] = filter.price?.split('-') || [];
            const res = await axios.get(`http://localhost:8000/api/products/paginate`, {
                params:{ page,
                    limit: 12,
                    category: filter.category,
                    ...(minPrice && maxPrice && { minPrice, maxPrice })},
                headers: { 'Cache-Control': 'no-cache' },
            });
            const { payload, totalPages, currentPage } = res.data;
            // console.log(res.data);

            setProducts(payload); // Ya viene filtrado desde el backend
            setFilteredProducts(payload);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(1); 
    }, [filter]);


    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    

    if (loading) return <Loaders />;

    return (
        <>
            <SubHeader/>
            <section className="product-display">
                <div className='section-prod'> 
                    <div className="filters-container">
                        <select name="category" value={filter.category} onChange={handleFilterChange}>
                            <option value="">📦 Todas las Categorías</option>
                            <option value="Abrigos">🧥 Abrigos</option>
                            <option value="Camisas">👔 Camisas</option>
                            <option value="Pantalones">👖 Pantalones</option>
                            <option value="shirt">👕 Shirt</option>
                            <option value="Zapatillas">👟 Zapatillas</option>
                        </select>
            
                        <select name="price" value={filter.price} onChange={handleFilterChange}>
                            <option value="">💲 Todos los Precios</option>
                            <option value="0-50">$0 - $50</option>
                            <option value="50-100">$50 - $100</option>
                            <option value="100-500">$100 - $500</option>
                        </select>
                    </div>
                    <div className="product-list">  
                        <div className='grid'>
                        {filteredProducts.map(product => (  
                            <div key={product._id} className="product-item">  
                                <img src={product.photo} alt={product.title} onClick={() => openModal(product)} />
                                <h2>{product.title}</h2>
                                {product.stock === 0 ? ( 
                                    <p className='stock'>Stock: {product.stock} <p className='sin-stock'>SIN STOCK</p></p> 
                                ) : (
                                    <p className='stock'>Stock: {product.stock} </p>)
                                }
                                <div className='card-actions'>
                                    <p>Precio: ${product.price.toFixed(2)}</p>
                                    <button onClick={() => handleAddToCart(product)} disabled={!isLoggedIn} 
                                    title={isLoggedIn ? '' : 'Debes iniciar sesión para agregar productos'}>Comprar</button>
                                </div>
                            </div>)
                        )}
                        </div>
                        {filteredProducts.length > 0 && 
                        <div className="pagination">
                            <button className={`size-buttons ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => fetchProducts(currentPage - 1)} disabled={currentPage === 1}><HiOutlineArrowNarrowLeft/> </button>
                            <span>Página {currentPage} de {totalPages}</span>
                            <button className={`size-buttons ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => fetchProducts(currentPage + 1)} disabled={currentPage === totalPages}><HiOutlineArrowNarrowRight/> </button>
                        </div>}
                    </div> 
                </div>
            </section>

            {/* Modal para mostrar detalles del producto */}
            {isModalOpen && selectedProduct && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{selectedProduct.title}</h2>
                            <span className="close" onClick={closeModal}>&times;</span>
                        </div>
                        <div className='modal-global'>
                            <div className='modal-body'>
                                <div className='modal-image'>
                                    <img src={selectedProduct.photo} alt={selectedProduct.title} />
                                </div>
                                <div className='modal-footer'>
                                    <p><strong>Precio: ${selectedProduct.price}</strong></p>
                                    {selectedProduct.category === 'Zapatillas' && (
                                        <div className="size-selection">
                                            <h4>Selecciona tu talla:</h4>
                                            <div className="size-buttons">
                                                {['36', '37', '38', '39', '40', '41', '42', '43'].map(size => (
                                                    <button key={size} onClick={() => setSelectedSize(size)} >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )} { selectedProduct.category === 'Abrigos' && (
                                        <div className="size-selection">
                                            <h4>Selecciona tu talla:</h4>
                                            <div className="size-buttons">
                                                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                                    <button key={size} onClick={() => handleSizeSelect(size)}>
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <button onClick={() => handleAddToCart(selectedProduct)}>Añadir al carrito</button>
                                    <h3>Detalles del Producto</h3>
                                    <p>{selectedProduct.description}--- Descripcion del producto --- </p>
                                    <StarRating rating={rating} onRatingChange={handleRatingChange} />
                                    <div className='rating'>
                                        <p>Tu calificación: {rating} estrellas</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Toaster />
        </>
    );
};

export default ProductDisplay;

