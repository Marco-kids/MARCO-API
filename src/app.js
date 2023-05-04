const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const routesObra = require("./routes/obra");
const routesLocation = require("./routes/location");
const routesMuseo = require("./routes/museo");
require("dotenv").config();

// Settings
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api", routesObra);
app.use("/api", routesLocation);
app.use('/uploads', express.static('uploads'));
app.use('/api', routesMuseo)

mongoose.set('strictQuery', false);

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to MARCO KIDS API");
});

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error(error));

app.listen(port, () => console.log(`Running at localhost:${port}`));