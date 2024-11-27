// /server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // 'Bearer <token>'

  if (!token) {
    return res.sendStatus(403); // Forbidden
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;