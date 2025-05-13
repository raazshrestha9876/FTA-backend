import { validationResult } from 'express-validator';

// Middleware to validate request data
// This middleware checks if the request data is valid according to the validation rules defined in the validators
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};