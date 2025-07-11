const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
  // Try to get token from Authorization header
  const authHeader = req.headers['authorization'];
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies) {
    // fallback to cookie token
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ status: 'failed', message: 'Token is invalid or missing!' });
  }

  const jwtSecretKey = process.env.jwtSecretKey;

  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: 'failed', message: err.message });
    }

    req.user = decoded;
    next();
  });
};


module.exports = {
    authenticateUser
}