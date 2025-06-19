import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth/authRoutes.js";
import reviewRoute from "./routes/review/reviewRoute.js";

import exerciseCategoryRoute from "./routes/exercise/exerciseCategoryRoutes.js";
import exerciseSubcategoryRoute from "./routes/exercise/exerciseSubcategoryRoutes.js";
import exerciseRoute from "./routes/exercise/exerciseRoutes.js";
import exerciseWorkoutRoute from "./routes/exercise/exerciseWorkoutRoutes.js";

import dietCategoryRoute from "./routes/nutrition/dietCategoryRoute.js";
import dietSubcategoryRoute from "./routes/nutrition/dietSubcategoryRoute.js";
import dietRoute from "./routes/nutrition/dietRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

connectDB();

app.use("/api/auth", authRoute);

app.use("/api/exercise/categories", exerciseCategoryRoute);
app.use("/api/exercise/subcategories", exerciseSubcategoryRoute);
app.use("/api/exercise/exercises", exerciseRoute);
app.use("/api/exercise/workout", exerciseWorkoutRoute);

app.use("/api/nutrition/categories", dietCategoryRoute);
app.use("/api/nutrition/subcategories", dietSubcategoryRoute);
app.use("/api/nutrition/diet", dietRoute);
app.use("/api/review", reviewRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
