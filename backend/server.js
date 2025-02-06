const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_APP_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/form", contactRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
