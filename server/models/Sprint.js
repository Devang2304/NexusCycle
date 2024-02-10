const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
    project: {
        type: String,
        required: true
    },
    sprintStartDate: {
        type: Date,
        required: true
    },
    sprintEndDate: {
        type: Date,
        required: true
    },
    developer: [
        {
            email: {
                type: String,
                required: true
            },
            features: [
                {
                    type: String,
                    default: null
                }
            ]
        }
    ],
    scrumMaster: {
        type: String,
        default: null
    },
}, { timestamps: true });

module.exports = mongoose.model("Sprint", sprintSchema);