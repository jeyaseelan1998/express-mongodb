const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const { connectDB } = require("./db");
const HealthCheckRouter = require("./routers/HealthCheckRouter");
const AccountRouter = require("./routers/AccountRouter");

dotenv.config();

const PORT = process.env.PORT || 3000;
const expressApp = express();
var upload = multer();

// common middlewares
expressApp.use(
    cors({
        origin: "*",
        methods: ["GET", "PUT", "POST", "DELETE"],
    })
);
expressApp.use(cookieParser());
expressApp.use(bodyParser.json());
expressApp.use(upload.array());
expressApp.use(express.static("public"));
expressApp.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routers
expressApp.use("/api/v1/users", AccountRouter);
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
