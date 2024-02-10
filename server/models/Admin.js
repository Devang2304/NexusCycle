const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    company: {
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
    // profilePicture: {
    //     type: String,
    //     default: ""
    // },
    role: {
        type: String,
        default: "admin"
    }
}, { timestamps: true });
