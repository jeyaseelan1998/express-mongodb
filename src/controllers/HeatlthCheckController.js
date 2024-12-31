const { ApiError } = require("../helper/ApiError");
const { ApiResponse } = require("../helper/ApiResponse");

const HeatlthCheckController = async (request, response) => {
    try {
        response
            .status(200)
            .json(
                new ApiResponse(200, {}, "HeatlthCheckController is working")
            );
    } catch (error) {
        response.status(500).json(new ApiError(500, error.message));
    }
};

module.exports = HeatlthCheckController;
