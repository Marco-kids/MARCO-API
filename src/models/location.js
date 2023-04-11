const mongoose = require("mongoose");

const location = mongoose.Schema({
    nombre: {
        type: String,
    },
    screenshot: {
        type: String,
    },
    ARWorldMap: {
        type: String,
    }
});

module.exports = mongoose.model('location', location);