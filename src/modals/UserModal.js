const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const mongooseAggregate = require("mongoose-aggregate-paginate-v2");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            require: [true, "Password is required"],
        },
        avatar: String, // cloudinary url
        refreshToken: String,
    },
    { timestamps: true }
);

userSchema.plugin(mongooseAggregate);

module.exports = mongoose.model("User", userSchema);
