import jwt from 'jsonwebtoken';

/**
 * Middleware to protect routes by verifying a JWT.
 * It decodes the token from the Authorization header and attaches the user's ID to the request object.
 */
export const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (e.g., "Bearer TOKEN_STRING")
            token = req.headers.authorization.split(' ')[1];

            // Verify token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user's ID to the request for use in controllers
            req.user = { id: decoded.id };

            next(); // Proceed to the next middleware or controller
        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
