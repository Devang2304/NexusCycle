const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const scrumMasterSchema = new mongoose.Schema({
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
        default: "scrummaster"
    },
    project: [
        {
            type: String,
            default: null
        }
    ],
    company: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("ScrumMaster", scrumMasterSchema);