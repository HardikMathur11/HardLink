const jwt = require('jsonwebtoken');
const User = require('../models/user');

const usermiddleware = async (req, res, next) => {
   try {
       const token = req.cookies.token;
       if (!token) {
           return res.status(401).json({ message: "User Not Found or Not Logged In" });
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