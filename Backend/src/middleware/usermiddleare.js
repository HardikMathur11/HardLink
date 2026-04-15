const jwt = require('jsonwebtoken');
const User = require('../models/user');

const usermiddleware = async (req, res, next) => {
   try {
       // Check for token in cookies OR Authorization header
       const cookieToken = req.cookies.token;
       const headerToken = req.headers.authorization?.startsWith('Bearer ') 
           ? req.headers.authorization.split(' ')[1] 
           : null;

       const token = cookieToken || headerToken;

       if (!token) {
           return res.status(401).json({ message: "No authentication token found" });
       }
       
       const payload = jwt.verify(token, process.env.JWT_SECRET);
       if (payload.id) {
           const user = await User.findById(payload.id).select('-password');
           if (!user) {
               return res.status(404).json({ message: "User Not Found in Database" });
           }
           req.user = user;
           next();
       }
   } catch (error) {
       return res.status(401).json({ message: "Invalid or Expired Token" });
   }
};

module.exports = usermiddleware;