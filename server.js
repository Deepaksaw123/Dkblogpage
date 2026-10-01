const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

const PORT = process.env.PORT || 5000;


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());


// ==========================================
// API TEST
// ==========================================

app.get("/api", (req, res) => {

    res.json({
        message: "BlogHub Backend API is running",
        status: "success"
    });

});


// ==========================================
// API ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

app.use("/api/blogs", blogRoutes);


// ==========================================
// FRONTEND
// ==========================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});


// ==========================================
// MONGODB + SERVER
// ==========================================

mongoose
    .connect(process.env.MONGO_URI)

    .then(() => {

        console.log("MongoDB Connected");

        app.listen(PORT, () => {

            console.log(
                `Server running on http://localhost:${PORT}`
            );

            console.log(
                `API running on http://localhost:${PORT}/api`
            );

        });

    })

    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

    });