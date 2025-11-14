import { faker } from '@faker-js/faker';

export const generateMockProducts = (count = 10) => {
    const products = [];
    const categories = ['Abrigos', 'Articulo', 'Zapatos', 'Zapatillas'];
    for (let i = 0; i < count; i++) {
        const category = faker.helpers.arrayElement(categories)
        
        products.push({
            title: faker.company.name().replace(/\s+/g, '-'),//.toLowerCase(),
            photo: faker.image.urlPicsumPhotos({ width: 600, height: 600 }),
            category,
            price: parseInt(faker.commerce.price({ min: 8000, max: 60000 })), // precios más realistas
            stock: faker.number.int({ min: 5, max: 100 }),
            createdAt: new Date(),
        });
    }

    return products;
};
