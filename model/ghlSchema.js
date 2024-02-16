// ghlSchema.js
const mongoose = require("mongoose");

const ghlSchema = new mongoose.Schema({
    access_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
    companyId: { type: String, required: true },
    locationId: { type: String, required: true },
    userId: { type: String, required: true }
});

const GhlToken = mongoose.model('GhlToken', ghlSchema);

module.exports = {GhlToken};