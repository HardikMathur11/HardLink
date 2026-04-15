const validator = require('validator');




const registervalidator = (req, res) => {
    const { FirstName, LastName, Email, password } = req.body;
    if (!FirstName || !LastName || !Email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!validator.isEmail(Email)) {
        return res.status(400).json({ message: "Invalid Email" });
    }
    if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    if (!validator.isLength(FirstName, { min: 2 })) {
        return res.status(400).json({ message: "First name must be at least 2 characters long" });
    }
    if (!validator.isLength(LastName, { min: 2 })) {
        return res.status(400).json({ message: "Last name must be at least 2 characters long" });
    }

}





const loginvalidator = (req, res) => {
    const { Email, password } = req.body;
    if (!Email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!validator.isEmail(Email)) {
        return res.status(400).json({ message: "Invalid Email" });
    }
    if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

}
module.exports = { registervalidator, loginvalidator }
