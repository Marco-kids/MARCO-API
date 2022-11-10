const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/obra");
require("dotenv").config();

// settings
const app = express();
const port = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use("/api", routes);

// routes
app.get("/", (req, res) => {
    res.send("Welcome to MARCO KIDS API");
});

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Connected to MongodB"))
    .catch((error) => console.error(error));

app.listen(port, () => console.log(`Running at localhost:${port}`));