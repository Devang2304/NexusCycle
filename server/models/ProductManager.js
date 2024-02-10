import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const productManagerSchema = new mongoose.Schema(
    {
        company: {
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
        profilePicture: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "manager",
        },
    },
    { timestamps: true }
    );