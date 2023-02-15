const mongoose = require("mongoose");

const ARLoaction = mongoose.Schema({
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

module.exports = mongoose.model('ARLocation', ARLoaction);