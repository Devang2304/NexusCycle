const mongoose = require("mongoose")

const productOwnerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        profilePicture: {
            type: String,
            default:""
        },
        role: {
            type: String,
            default: "productowner",
        },
        project: [{
            type: String,
            required: true,
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("ProductOwner", productOwnerSchema);