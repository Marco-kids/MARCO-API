const mongoose = require("mongoose");

const museoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    obras: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Obra' }],
        required: true
    },
    locations: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'location' }],
        required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    imagen: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('Museo', museoSchema);