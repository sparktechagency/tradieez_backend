
import { ErrorRequestHandler } from "express";

// eslint-disable-next-line no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
        error: {
            message
        }
    });
}

export default globalErrorHandler;