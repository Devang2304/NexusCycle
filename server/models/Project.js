const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    features:{
        type: Array,
        default: []
    },
    scrumMaster: {
        type: String,
        default:null
    },
    developers: {
        type: Array,
        default: []
    },
    admin_email: {
        type: String,
        required: true
    },
    owner_email:{
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    pending:{
        type: Array,
        default: []
    },
    assigned:{
        type: Array,
        default: []
    },
    completed:{
        type: Array,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);