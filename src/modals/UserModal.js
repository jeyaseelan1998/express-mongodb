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

userSchema.pre("save", async function (next) {
    if (this.modified("password")) {
        this.password = bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    jwt.sign(
        {
            _id: this._id,
            username: this.username,
            password: this.password,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        {
            _id: this._id,
            username: this.username,
            password: this.password,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

userSchema.plugin(mongooseAggregate);

module.exports = mongoose.model("User", userSchema);
