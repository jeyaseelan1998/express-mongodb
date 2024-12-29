const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(
            `${process.env.MONGO_URI}/${process.env.DB_NAME}`
        );
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } catch (error) {
        console.log("Can not connect DB", error);
        process.exit(1);
    }
};

module.exports = { connectDB };
