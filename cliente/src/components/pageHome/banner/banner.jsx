import React, { useEffect, useState } from "react";
import './banner.css';
import Aos from 'aos';
import slogan from '../../../assets/slogan.png'
import 'aos/dist/aos.css';
import axios from "axios";
import PromotionsBanner from './../../publicidad/publicidad.jsx';

const Banner = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(()=>{
        Aos.init({duration: 1500});

        // Petición al backend
        const fetchOutstandingProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products/outstanding', {
                    headers: { 
                        'Cache-Control': 'no-cache',
                        "Content-type": "application/json",
                    }
                });
                setFeaturedProducts(response.data.products);
            } catch (error) {
                console.error("Error al cargar productos destacados:", error);
            }
        };
        fetchOutstandingProducts();
    },[])


    return (
        <>
            <div className="banner-conteiner">
                <img src={slogan} alt="portada" />
                <div className="hero">
                    <div className="hero-content" data-aos="fade-up">
                        <h1>Encuentra los mejores productos para tu mejor estilo</h1>
                        <a href="/products" className="btn-explore">Explorar Productos</a>
                    </div>
                </div>

                <PromotionsBanner/>
                <div className="featured-products" >
                    <h2 data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="300" data-aos-offset="0">
                        PRODUCTOS DESTACADOS
                    </h2>
                    <div className="carousel" data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="300" data-aos-offset="0" >
                        <div className="carousel-inner">
                            <div className="product-grid">
                            {featuredProducts.map(product => (
                                <div className="product-card" key={product.id}>
                                    <img src={product.photo} alt={product.title} />
                                    <h3>{product.title}</h3>
                                    <p>${product.price}</p>
                                    <a href={`/products/${product.id}`} className="btn-secondary">Ver Detalles</a>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
