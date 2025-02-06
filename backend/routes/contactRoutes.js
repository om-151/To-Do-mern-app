const express = require("express");
const contact = require('../models/Contact')

const router = express.Router();

router.post("/contact", async (req, res) => {
    try {
        const response = req.body;
        await contact.create(response);
        return res.status(200).json({ message: "Message send successful" })
    } catch (error) {
        return res.status(500).json({ message: "Message not send" })
    }
})

module.exports = router;
