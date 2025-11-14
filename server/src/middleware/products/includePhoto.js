export const incluirFotoEnBody = (req, res, next) => {
    const categories = ['Abrigos', 'Articulo', 'Zapatos', 'Zapatillas'];

    if (req.file && req.file.filename) {
        req.body.photo = `http://localhost:8000/assets/${req.file.filename}`;
    } else {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        req.body.photo = `https://source.unsplash.com/640x480/?${randomCategory}`;
    }

    next();
};

