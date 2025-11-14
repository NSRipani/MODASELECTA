const loginCheck = (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Faltan campos requeridos: email y password.' });
        }
        next();
    } catch (error) {
        return next(error)
    }
};

export default loginCheck