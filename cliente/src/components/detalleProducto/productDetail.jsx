
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCarroContext } from '../../context/cartContext.jsx';
import { useProdContext } from '../../context/prodContext.jsx';
import './productDetail.css';
import { useUserContext } from '../../context/userContext.jsx';
import Loaders from './../pageProducts/loaders/loaders.jsx';

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
  const { id } = useParams();
  const { addToCart } = useCarroContext();
  const { payload } = useUserContext();
  const { getProductById, findProductByIdLocal } = useProdContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Busca primero en la lista local, si no está, consulta al backend
    let prod = findProductByIdLocal ? findProductByIdLocal(id) : null;
    if (prod) {
      setProduct(prod);
    } else if (getProductById) {
      getProductById(id).then(res => setProduct(res));
    }
  }, [id, findProductByIdLocal, getProductById]);
  console.log('Producto ', product)
  if (!product) return <Loaders />;

  const handleRatingChange = (newRating) => setRating(newRating);

  return (
    <div className="contenier">
      <div className="product-detail-container">
        <div className="product-detail-card">
          <div className="product-detail-main">
            {/* Imagen principal */}
            <div className="product-detail-image">
              <img src={product.photo} alt={product.title} />
            </div>
            {/* Info */}
            <div className="product-detail-info">
              <h1 className="product-title">{product.title}</h1>
              <p className="product-price">${product.price}</p>
              <p className={`product-stock ${product.stock === 0 ? 'out' : ''}`}>{product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}</p>
              <StarRating rating={rating} onRatingChange={handleRatingChange} />
              <p className="rating-text">Tu calificación: {rating} estrellas</p>
              <button className="add-to-cart-btn" onClick={() => addToCart(product)} disabled={product.stock === 0 || !payload || payload.role !== 'user'}>
                {product.stock === 0 ? 'Sin stock' : (!payload || payload.role !== 'user') ? 'Solo usuarios autorizados' : 'Añadir al carrito'}</button>
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
    </div>
  );
};

export default ProductDetail;

