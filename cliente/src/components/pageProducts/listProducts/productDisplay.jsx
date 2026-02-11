import './productDisplay.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { useCarroContext } from '../../../context/cartContext.jsx';
import SubHeader from '../category/sub-nav.jsx';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useAuthContext } from '../../../context/authContext.jsx';
import { errorMessag, success } from '../../message/message.jsx';
import LoadingSpinner from '../../common/LoadingSpinner.jsx';

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
    const { payload } = useAuthContext();
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
    const [favorites, setFavorites] = useState(new Set());

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
        if (!isLoggedIn) {
            errorMessag('Debes iniciar sesión para agregar productos al carrito');
            return;
        }
        addToCart(product);
        // success(`${product.title} agregado al carrito`);
    };

    const toggleFavorite = (productId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            console.log('Favorites antes:', newFavorites);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
                success('Removido de favoritos');
            } else {
                newFavorites.add(productId);
                success('Agregado a favoritos');
            }
            return newFavorites;
        });
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        setSelectedSize(null);
        setRating(0);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    

    if (loading) return <LoadingSpinner message="Cargando productos..." />;

    return (
        <>
            <SubHeader />
            <section className="product-display">
                <div className="product-display-container">
                    <div className="filters-section">
                        <div className="filters-container">
                            <div className="filter-group">
                                <label>Categoría</label>
                                <select name="category" value={filter.category} onChange={handleFilterChange}>
                                    <option value="">Todas las Categorías</option>
                                    <option value="Abrigos">🧥 Abrigos</option>
                                    <option value="Camisas">👔 Camisas</option>
                                    <option value="Pantalones">👖 Pantalones</option>
                                    <option value="shirt">👕 Shirts</option>
                                    <option value="Zapatillas">👟 Zapatillas</option>
                                </select>
                            </div>

                            <div className="filter-group">
                                <label>Rango de Precio</label>
                                <select name="price" value={filter.price} onChange={handleFilterChange}>
                                    <option value="">Todos los Precios</option>
                                    <option value="0-50">$0 - $50</option>
                                    <option value="50-100">$50 - $100</option>
                                    <option value="100-500">$100 - $500</option>
                                </select>
                            </div>
                        </div>
                        <div className="results-count">
                            {filteredProducts.length} productos encontrados
                        </div>
                    </div>
                </div>
                <div className="products-section">
                    <div className="products-grid">
                        {filteredProducts.map(product => (
                            <div key={product._id} className="card-product">
                                <div className="product-image-container">
                                    <img src={product.photo} alt={product.title} onClick={() => openModal(product)} className="image-product" />
                                    <div className="product-overlay">
                                        <button className="quick-view-btn" onClick={() => openModal(product)}>Vista Rápida</button>
                                    </div>
                                    <button className={`favorite-btn ${favorites.has(product._id) ? 'active' : ''}`} onClick={() => toggleFavorite(product._id)}><FaHeart /></button>
                                    {product.stock === 0 && (
                                        <div className="out-of-stock-badge">SIN STOCK</div>
                                    )}
                                </div>
                                <div className="info-product">
                                    <h3 className="title-product">{product.title}</h3>
                                    <div className="product-price">
                                        <span className="price">${product.price.toFixed(2)}</span>
                                    </div>
                                    <div className="product-stock">
                                        Stock: {product.stock}
                                    </div>
                                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}
                                        disabled={!isLoggedIn || product.stock === 0}><FaShoppingCart />
                                        {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                {filteredProducts.length > 0 && (
                    <div className="pagination">
                        <button
                            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                            onClick={() => fetchProducts(currentPage - 1)}
                            disabled={currentPage === 1}
                        ><HiOutlineArrowNarrowLeft />Anterior</button>
                        <div className="pagination-info">Página {currentPage} de {totalPages}</div>
                        <button
                            className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                            onClick={() => fetchProducts(currentPage + 1)}
                            disabled={currentPage === totalPages}>Siguiente<HiOutlineArrowNarrowRight />
                        </button>
                    </div>
                )}

                {filteredProducts.length === 0 && (
                    <div className="no-products">
                        <h3>No se encontraron productos</h3>
                        <p>Intenta cambiar los filtros</p>
                    </div>
                )}
                </div>

            </section>

            {/* Modal para detalles del producto */}
            {isModalOpen && selectedProduct && (
                <div className="product-modal-overlay" onClick={closeModal}>
                    <div className="product-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedProduct.title}</h2>
                            <button className="modal-close" onClick={closeModal}>×</button>
                        </div>

                        <div className="modal-body">
                            <div className="modal-image-section">
                                <img src={selectedProduct.photo} alt={selectedProduct.title} />
                            </div>

                            <div className="modal-info-section">
                                <div className="product-details">
                                    <div className="price-section">
                                        <span className="price">${selectedProduct.price.toFixed(2)}</span>
                                        <span className="stock">Stock: {selectedProduct.stock}</span>
                                    </div>

                                    <div className="rating-section">
                                        <StarRating rating={rating} onRatingChange={handleRatingChange} />
                                        <span>Tu calificación: {rating} estrellas</span>
                                    </div>

                                    {(selectedProduct.category === 'Zapatillas' || selectedProduct.category === 'Abrigos') && (
                                        <div className="size-selection">
                                            <h4>Selecciona tu talla:</h4>
                                            <div className="size-options">
                                                {(selectedProduct.category === 'Zapatillas'
                                                    ? ['36', '37', '38', '39', '40', '41', '42', '43']
                                                    : ['S', 'M', 'L', 'XL', 'XXL']
                                                ).map(size => (
                                                    <button
                                                        key={size}
                                                        className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                                        onClick={() => handleSizeSelect(size)}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <button className="add-to-cart-modal-btn" onClick={() => handleAddToCart(selectedProduct)}
                                        disabled={!isLoggedIn || selectedProduct.stock === 0}
                                    >
                                        <FaShoppingCart />
                                        {selectedProduct.stock === 0 ? 'Sin Stock' : 'Añadir al Carrito'}
                                    </button>

                                    <div className="product-description">
                                        <h4>Descripción</h4>
                                        <p>{selectedProduct.description || 'Descripción del producto no disponible.'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Toaster position="top-right" />
        </>
    );
};

export default ProductDisplay;

