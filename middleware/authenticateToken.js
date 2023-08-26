
require('dotenv').config();

function authenticateToken(req, res, next) {
    const token = req.header('auth-token');
    console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    if (token !== process.env.API_KEY) {
        return res.status(403).json({ message: 'Invalid token' });
    }
    next();

}

module.exports = authenticateToken;