const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const developerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "developer"
    },
    project : {
        type: Array,
        default: []
    },
    company: {
        type: String,
        required: true
    },
    admin_email: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Developer", developerSchema);