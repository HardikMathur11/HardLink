const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { registervalidator, loginvalidator } = require('../utils/validator')
const bcrypt = require('bcrypt')
const register = async (req, res) => {
    registervalidator(req);
    const { FirstName, LastName, Email, password } = req.body;
    const isexist = await User.findOne({ Email });
    if (isexist) {
        return res.status(400).json({ message: "User Already Exists try login" })
    }

    const hashpassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        FirstName,
        LastName,
        Email,
        password: hashpassword
    })
    res.status(200).json({ message: "User Registered Successfully" })
}
const login = async (req, res) => {
    loginvalidator(req, res)
    const { Email, password } = req.body
    const user = await User.findOne({ Email })
    if (!user) {
        return res.status(400).json({ message: "User Not Found" })
    }

    const ismatch = await bcrypt.compare(password, user.password)
    if (!ismatch) {
        return res.status(400).json({ message: "Invalid Password" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    res.cookie("token", token, { httpOnly: true, secure: true })

    const userinfo = {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        _id: user._id
    }
    res.status(200).json({ message: "User Logged In Successfully", token, userinfo })
}

const logout = async (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true });
    res.status(200).json({ message: "User Logged Out Successfully" });
}

module.exports = { register, login, logout }