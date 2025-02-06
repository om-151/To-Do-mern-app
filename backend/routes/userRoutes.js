const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const userCreate = await User.create({
            name,
            email,
            password,
        })

        res.status(201).json({
            user: {
                _id: userCreate._id,
                name: userCreate.name,
                email: userCreate.email,
            },
            token: await userCreate.generateToken(),
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token: await user.generateToken(),
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
