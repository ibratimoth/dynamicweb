class ResponseHandler {
    sendResponse(res, statusCode, success, message, data = null) {
        return res.status(statusCode).send({
            success,
            message,
            data,
        });
    }
}

module.exports = ResponseHandler;
