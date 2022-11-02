const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const obraRoutes = require("./routes/obra");

// settings
const app = express();
const port = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use("/api", obraRoutes);

// routes
app.get("/", (req, res) => {
    res.send("Welcome to MARCO KIDS API");
});

mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => console.log("Connected to MongodB"))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('server listening on port', port));