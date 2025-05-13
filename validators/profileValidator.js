import { body } from "express-validator";

// Profile Validator
const updateProfileValidator = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Name is required")
    .trim(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("age")
    .optional()
    .isInt({ min: 0, max: 120 })
    .withMessage("Age must be a number between 0 and 120")
    .toInt(),

  body("height")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Height must be a positive number")
    .toFloat(),

  body("weight")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Weight must be a positive number")
    .toFloat(),
];

export default updateProfileValidator;
