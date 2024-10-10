const jwt = require('jsonwebtoken');

const auth = (role) => {
  return (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (role && role !== decoded.role) {
        return res.status(403).json({ msg: 'Access denied' });
      }
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};

module.exports = auth;
