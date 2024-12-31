const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

const { connectDB } = require("./db");

const HealthCheckRouter = require("./routers/HealthCheckRouter");

dotenv.config();

const PORT = process.env.PORT || 3000;
const expressApp = express();

// common middlewares
expressApp.use(
    cors({
        origin: "*",
        methods: ["GET", "PUT", "POST", "DELETE"],
    })
);

expressApp.use(express.json());
expressApp.use(express.static("public"));
expressApp.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routers
expressApp.use("/api/v1/health-check", HealthCheckRouter);

const initializeDBAndServer = async () => {
    try {
        await connectDB();
        expressApp.listen(PORT, () =>
            console.log(`Server is running at ${process.env.BASE_URL}`)
        );
    } catch (error) {
        process.exit(1);
    }
};

module.exports = { initializeDBAndServer };
