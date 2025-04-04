exports.getTest = (request, response, next) => {
    response.status(200).json({ code: 200, msg: "Ok" });
};