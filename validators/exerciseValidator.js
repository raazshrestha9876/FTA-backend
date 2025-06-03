import { body } from "express-validator";

// Validator for exercise data
export const categoryValidator = [
  body("name").isEmpty().withMessage("Name is required").trim(),
  body("image").isEmpty().withMessage("Image is required"),
];

export const subcategoryValidator = [
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Category must be a valid Mongo ID"),

  body("dayNumber")
    .notEmpty()
    .withMessage("Day number is required")
    .isInt({ min: 1, max: 7 })
    .withMessage("Day number must be an integer between 1 and 7"),

  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isArray({ min: 1 })
    .withMessage("Name must be a non-empty array"),

  body("name.*").isString().withMessage("Each name must be a string"),

  body("description").notEmpty().withMessage("Description is required"),
];



// export const exerciseValidator = [
//   body("subcategory")
//     .notEmpty()
//     .withMessage("Subcategory is required")
//     .isMongoId()
//     .withMessage("Subcategory must be a valid Mongo ID"),

//   body("name")
//     .notEmpty()
//     .withMessage("Exercise name is required")
//     .isString()
//     .withMessage("Exercise name must be a string"),

//   // Remove image validation from here because it's coming from `req.file`

//   body("sets")
//     .notEmpty()
//     .withMessage("Sets are required")
//     .isInt({ min: 1 })
//     .withMessage("Sets must be an integer greater than or equal to 1"),

//   body("duration")
//     .notEmpty()
//     .withMessage("Duration is required")
//     .isInt({ min: 20, max: 60 })
//     .withMessage("Duration must be between 20 and 60 minutes"),

//   body("instructions")
//     .notEmpty()
//     .withMessage("Instructions are required")
//     .isString()
//     .withMessage("Instructions must be a string"),

//   body("videoUrl")
//     .optional()
//     .isURL()
//     .withMessage("Video URL must be a valid URL"),

//   body("focusArea")
//     .notEmpty()
//     .withMessage("Focus area is required")
//     .isArray({ min: 1 })
//     .withMessage("Focus area must be a non-empty array"),

//   body("focusArea.*")
//     .isString()
//     .withMessage("Each focus area must be a string"),
// ];
