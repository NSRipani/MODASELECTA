export const roleAuth = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "You are not authorized for this section" });
        }

        // Asegurarse de que 'roles' sea un array (por si pasaron un solo rol como string)
        const allowedRoles = Array.isArray(roles) ? roles : [roles];

        // Verifica si el usuario tiene un rol permitido
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access denied: insufficient permissions" });
        }

        next(); // Permite continuar a la siguiente función
    };
};
