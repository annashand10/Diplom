class Response {
    constructor(status = 200, content) {
        this.status = status;
        this.content = content;
    }

    send(res) {
        res.status(this.status).send(this.content);
    }
}

class ErrorResponse extends Response {
    constructor(status = 400, message) {
        super(status, {
            success: false,
            error: {
                message
            }
        });
    }
}

class ValidationErrorResponse extends ErrorResponse {
    constructor(message) {
        super(422, message);
    }
}

class AccessDeniedResponse extends ErrorResponse {
    constructor(message = 'Access denied') {
        super(403, message);
    }
}

module.exports = {
    Response,
    ErrorResponse,
    ValidationErrorResponse,
    AccessDeniedResponse
};
