const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { registervalidator, loginvalidator } = require('../utils/validator')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    try {
        registervalidator(req, res); // Fixed: Added 'res' argument
        const { FirstName, LastName, Email, password } = req.body;
        
        // Return if headrs already sent by validator
        if (res.headersSent) return;

        const isexist = await User.findOne({ Email });
        if (isexist) {
            return res.status(400).json({ message: "User Already Exists try login" })
        }

        const hashpassword = await bcrypt.hash(password, 10)
        await User.create({
            FirstName,
            LastName,
            Email,
            password: hashpassword
        })
        res.status(200).json({ message: "User Registered Successfully" })
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const login = async (req, res) => {
    try {
        loginvalidator(req, res); // Fixed: Added 'res' argument
        const { Email, password } = req.body
        
        // Return if headers already sent by validator
        if (res.headersSent) return;

        const user = await User.findOne({ Email })
        if (!user) {
            return res.status(400).json({ message: "User Not Found" })
        }

        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.status(400).json({ message: "Invalid Password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' })

        const userinfo = {
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            _id: user._id
        }
        res.status(200).json({ message: "User Logged In Successfully", token, userinfo })
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const logout = async (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(200).json({ message: "User Logged Out Successfully" });
}

module.exports = { register, login, logout }