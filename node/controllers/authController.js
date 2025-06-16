const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../supabaseClient.js");

// register controller
const register = (async (req, res) => {
    const {username, password, email} = req.body;
    console.log(username, password, email);

    try {
        if (!username || !password || !email) {
            return res.status(400).json({ message: "all fields are required"});
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "user already exists" });
        }

        const newUser = await User.create({ username, email, password});
        await newUser.save();

        res.status(201).json({ message: "user registered successfully", user: newUser })
    } catch (err) {
        res.status(500).json({ message: `error: ${err}` });
    }
});

const login = (async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("invalid credentials");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h"});
        res.json({ message: "login successful", token});
    } catch (err) {
        res.status(500).json({ message: "server error"});
    }
});

module.exports = { register, login };
