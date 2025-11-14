import React, { useState } from 'react';
import './sub-nav.css';

const SubHeader = () => {
    const [activeCategory, setActiveCategory] = useState(null);

    const categories = [
        { name: 'Hombres', link: '/categorias/hombres', subcategories: ['Camisas', 'Calzado', 'Chaquetas', 'Pantalones', 'Shorts'] },
        { name: 'Mujeres', link: '/categorias/mujeres', subcategories: ['Blusas', 'Faldas', 'Pantalones', 'Calzado'] },
        { name: 'Niños', link: '/categorias/ninos', subcategories: ['Camisetas', 'Shorts', 'Vestidos', 'Calzado'] },
        { name: 'Accesorios', link: '/categorias/accesorios', subcategories: ['Bolsos', 'Cinturones', 'Bufandas', 'Gorros'] },
        { name: 'Ofertas', link: '/categorias/ofertas', subcategories: ['Descuentos', 'Liquidaciones'] },
    ];

    return (
        <div className="subheader">
            <nav>
                <ul>
                    {categories.map((category, index) => (
                        <li key={index}
                            onMouseEnter={() => setActiveCategory(index)}
                            onMouseLeave={() => setActiveCategory(null)}
                        >
                            <a href={category.link}>{category.name}</a>
                            {activeCategory === index && (
                                <div className="dropdown">
                                    <ul className='dropdown-list'>
                                        {category.subcategories.map((subcategory, subIndex) => (
                                            <li key={subIndex}>
                                                <a href="#">{subcategory}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default SubHeader;
