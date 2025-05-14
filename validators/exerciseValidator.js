import { body } from "express-validator";

// Validator for exercise data
export const categoryValidator = [
  body("name")
    .isEmpty()
    .withMessage("Name is required")
    .trim()
];

export const daysValidator = [
    body("category").isEmpty().withMessage("Category is required")
    .isMongoId(),
    body('dayNumber').isInt({ min: 1, max: 7 })
    .withMessage('Day number must be an integer between 1 and 7'),
    body('muscleType')
    .isIn(['chest', 'back', 'shoulders', 'arms', 'legs', 'full-body', 'rest'])
    .withMessage('Invalid muscle type'),
]


export const exerciseValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .trim(),

  body("instructions")
    .notEmpty()
    .withMessage("Instructions are required")
    .trim(),

  body("equipment")
    .notEmpty()
    .withMessage("Equipment is required")
    .isIn(["none", "dumbbell", "barbell", "resistance band", "machine", "kettlebell", "bodyweight"])
    .withMessage("Invalid equipment type"),

  body("day")
    .notEmpty()
    .withMessage("Day is required")
    .isMongoId()
    .withMessage("Invalid day ID"),

  body("image")
    .notEmpty()
    .withMessage("Image is required")
    .isString()
    .withMessage("Image must be a string"),

  body("videoUrl")
    .notEmpty()
    .withMessage("Video URL is required")
    .isString()
    .withMessage("Video URL must be a string"),
];

export const updateExerciseValidator = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim(),

  body("instructions")
    .optional()
    .isString()
    .withMessage("Instructions must be a string")
    .trim(),

  body("equipment")
    .optional()
    .isIn([
      "none",
      "dumbbell",
      "barbell",
      "resistance band",
      "machine",
      "kettlebell",
      "bodyweight"
    ])
    .withMessage("Invalid equipment type"),

  body("day")
    .optional()
    .isMongoId()
    .withMessage("Day must be a valid Mongo ID"),

  body("image")
    .optional()
    .isString()
    .withMessage("Image must be a string"),

  body("videoUrl")
    .optional()
    .isString()
    .withMessage("Video URL must be a string"),
];
