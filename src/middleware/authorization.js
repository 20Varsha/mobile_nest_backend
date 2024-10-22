const jwt = require('jsonwebtoken');
const constant = require("../constants/constants")
require('dotenv').config()
const User=require("../model/user")

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.startsWith('Bearer') ? authHeader.slice(7) : authHeader;
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);      
      const user = await User.findById(decoded.userId);      
      if (!user) {
        return res.status(401).json({ error: constant.USER_NOT_FOUND });
      }
      req.user = user;            
      next();
    } catch (err) {
      res.status(401).json({ error: constant.UNAUTHORIZED });
    }
  } else {
    res.status(401).json({ error: constant.TOKEN_MISSING });
  }
};

module.exports = { auth };
