const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
    date: { type: String, required: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    type: { type: String, required: true },
    media: { type: String, required: false },
    description: { type: String, required: true },
    status: { type: String, required: true },
});

module.exports = mongoose.model('Query', QuerySchema);
