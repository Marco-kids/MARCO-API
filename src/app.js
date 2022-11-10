const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/obra");
require("dotenv").config();

// Settings
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use("/api", routes);

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to MARCO KIDS API");
});

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error(error));

app.listen(port, () => console.log(`Running at localhost:${port}`));