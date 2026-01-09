
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCarroContext } from '../../context/cartContext.jsx';
import { useProdContext } from '../../context/prodContext.jsx';
import './productDetail.css';
import { useAuthContext } from '../../context/authContext.jsx';
import Loaders from './../pageProducts/loaders/loaders.jsx';
import { info } from '../message/message.jsx';

// Componente de estrellas
const StarRating = ({ rating, onRatingChange }) => (
  <div className="star-rating">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`star ${star <= rating ? 'filled' : ''}`}
        onClick={() => onRatingChange(star)}
      >
        ★
      </span>
    ))}
  </div>
);

const ProductDetail = () => {
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const { id } = useParams();
  const { addToCart } = useCarroContext();
  const { payload } = useAuthContext();
  const { getProductById, findProductByIdLocal } = useProdContext();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        // Busca primero en la lista local, si no está, consulta al backend
        let prod = findProductByIdLocal ? findProductByIdLocal(id) : null;
        if (!prod && getProductById) {
          prod = await getProductById(id);
        }
        if (prod) {
          setProduct(prod);
          setCurrentImage(prod.photo); // Establecer imagen inicial
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el producto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, findProductByIdLocal, getProductById]);

  if (loading) return <Loaders />;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div className="error-message">Producto no encontrado</div>;

  const handleRatingChange = (newRating) => setRating(newRating);

  const handleAddToCart = () => {
    if (!selectedSize) {
      info('Por favor selecciona una talla');
      return;
    }
    addToCart({ ...product, selectedSize });
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']; // Ejemplo de tallas

  const handleThumbnailClick = (photo) => {
    setCurrentImage(photo);
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-detail-main">

          {/* Galería de imágenes */}
          <div className="product-detail-gallery">
            <div className="product-detail-image">
              <img src={currentImage} alt={product.title} />
            </div>

            {/* Miniaturas adicionales si hay más fotos */}
            {product.photos && product.photos.length > 1 && (
              <div className="product-thumbnails">
                {product.photos.map((photo, index) => (
                  <img key={index} src={photo} alt={`${product.title} ${index + 1}`}
                    onClick={() => handleThumbnailClick(photo)} className={currentImage === photo ? 'active' : ''}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-detail-info">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-price">${product.price}</p>
            <p className={`product-stock ${product.stock === 0 ? 'out' : ''}`}>
              {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
            </p>
            {/* Selección de talla */}
            <div className="size-selection">
              <h3>Talla</h3>
              <div className="size-options">
                {sizes.map(size => (
                  <button key={size} className={`size-btn ${selectedSize === size ? 'selected' : ''}`} onClick={() => setSelectedSize(size)} > {size} </button>
                ))}
              </div>
            </div>
            <StarRating rating={rating} onRatingChange={handleRatingChange} />
            <p className="rating-text">Tu calificación: {rating} estrellas</p>
            <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={product.stock === 0 || !payload || payload.role !== 'user'} >
              {product.stock === 0 ? 'Sin stock' : (!payload || payload.role !== 'user') ? 'Solo usuarios autorizados' : 'Añadir al carrito'}
            </button>
            <div className="product-detail-specs">
              <h3>Especificaciones</h3>
              <ul>
                <li><strong>Peso:</strong> {product.weight} kg</li>
                <li><strong>Dimensiones:</strong> {product.dimensions}</li>
              </ul>
            </div>
            <div className="product-detail-desc">
              <h3>Descripción</h3>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
        <button className="volver-btn" onClick={() => navigate(-1)}>VOLVER</button>
      </div>
    </div>
  );
};

export default ProductDetail;

