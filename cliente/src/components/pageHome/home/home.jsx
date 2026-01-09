import React, { useEffect, useState } from 'react';
import './home.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaStar, FaTruck, FaShieldAlt, FaTshirt, FaSocks, FaHatCowboy, FaGem } from 'react-icons/fa';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories] = useState([
    { name: 'Ropa Mujer', icon: <FaTshirt />, link: '/products?category=mujer' },
    { name: 'Ropa Hombre', icon: <FaSocks />, link: '/products?category=hombre' },
    { name: 'Accesorios', icon: <FaGem />, link: '/products?category=accesorios' },
    { name: 'Zapatos', icon: <FaHatCowboy />, link: '/products?category=zapatos' }
  ]);

  useEffect(() => {
    Aos.init({ duration: 1000 });

    const fetchOutstandingProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/outstanding', {
          headers: {
            'Cache-Control': 'no-cache',
            "Content-type": "application/json",
          }
        });
        setFeaturedProducts(response.data.products.slice(0, 8)); // Limitar a 8 productos
      } catch (error) {
        console.error("Error al cargar productos destacados:", error);
      }
    };
    fetchOutstandingProducts();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content" data-aos="fade-up">
          <h1>Tu Estilo, Tu Personalidad</h1>
          <p>Descubre la colección más exclusiva de indumentaria. Calidad, estilo y comodidad en cada prenda.</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn-primary">Ver Colección</Link>
            <Link to="/users/register" className="btn-secondary">Crear Cuenta</Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat" data-aos="fade-up" data-aos-delay="200">
            <span className="stat-number">1000+</span>
            <span className="stat-label">Productos</span>
          </div>
          <div className="stat" data-aos="fade-up" data-aos-delay="400">
            <span className="stat-number">50k+</span>
            <span className="stat-label">Clientes</span>
          </div>
          <div className="stat" data-aos="fade-up" data-aos-delay="600">
            <span className="stat-number">4.8</span>
            <span className="stat-label">⭐ Rating</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container-elegirnos">
          <h2 data-aos="fade-up">¿Por qué elegirnos?</h2>
          <div className="features-grid">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <FaTruck className="feature-icon" />
              <h3>Envío Gratuito</h3>
              <p>En pedidos superiores a $50</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
              <FaShieldAlt className="feature-icon" />
              <h3>Pagos Seguros</h3>
              <p>Múltiples métodos de pago</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="600">
              <FaStar className="feature-icon" />
              <h3>Calidad Premium</h3>
              <p>Materiales de primera calidad</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="800">
              <FaShoppingBag className="feature-icon" />
              <h3>Devoluciones</h3>
              <p>30 días para cambiar tu compra</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div >
          <h2 data-aos="fade-up">Explora Nuestras Categorías</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={category.link}
                className="category-card"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <div className="category-icon">
                  {category.icon}
                </div>
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container-grid">
          <h2 data-aos="fade-up">Productos Destacados</h2>
          {featuredProducts.length > 0 ? (
            <div className="products-grid-home">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="prod-card" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="producto-de-image">
                    <img src={product.images || '/placeholder.jpg'} alt={product.title} />
                    <div className="product-overlay-info">
                      <Link to={`/products/${product.id}`} className="btn-view">Ver Detalles</Link>
                    </div>
                  </div>
                  <div className="product-infomation">
                    <h3>{product.title}</h3>
                    <div className="product-price">
                      <span className="current-price">${product.price}</span>
                      {product.originalPrice && (
                        <span className="original-price">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="product-rating">
                      <FaStar className="star" />
                      <span>4.5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="loading-products" data-aos="fade-up">
              <p>Cargando productos destacados...</p>
            </div>
          )}
          {/* <div className="view-all" data-aos="fade-up">
            <Link to="/products" className="btn-product">Ver Todos los Productos</Link>
          </div> */}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div >
          <div className="newsletter-content" data-aos="fade-up">
            <h2>Únete a Nuestra Comunidad</h2>
            <p>Recibe las últimas tendencias, ofertas exclusivas y consejos de estilo directamente en tu email.</p>
            <form className="newsletter-form-home">
              <input type="email" placeholder="Tu correo electrónico" required />
              <button type="submit" className="btn-primary">Suscribirse</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

