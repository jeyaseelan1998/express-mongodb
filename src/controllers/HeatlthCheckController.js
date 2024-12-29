const HeatlthCheckController = async (request, response) => {
    try {
        return response
            .status(200)
            .json({ message: "HeatlthCheckController is working" });
    } catch (error) {
        console.log("An unexpected error occured!", error);
    }
};

module.exports = HeatlthCheckController;
