const express = require('express');
const authrouter = express.Router();
const {register,login,logout} = require('../controller/auth')
const usermiddleware = require('../middleware/usermiddleare')



authrouter.post('/register',register)
authrouter.post('/login',login)

authrouter.post('/logout', logout)

authrouter.get('/me', usermiddleware, (req, res) => {
   res.status(200).json({ userinfo: req.user });
})


module.exports = authrouter;