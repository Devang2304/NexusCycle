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
    features:[
        {
            
        }
    ],
    scrumMaster: {
        type: String,
        required: true
    },
    developers: [
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

module.exports = mongoose.model("Project", projectSchema);