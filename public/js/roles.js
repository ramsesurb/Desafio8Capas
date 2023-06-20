export const requireRole = (requiredRole) => {
    return (req, res, next) => {
      if (req.session && req.session.user && req.session.user.role === requiredRole) {
        // El usuario tiene el rol requerido, permitir el acceso
        next();
      } else {
        // El usuario no tiene los privilegios necesarios, redirigir o mostrar un mensaje de error
        res.status(403).send('No tienes permisos para acceder a esta página.');
      }
    };
  };