import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import authRoutes from './routes/authRoutes';
// import profileRoutes from './routes/profileRoutes';
import cookieParser from "cookie-parser";
import categoryRoutes from "./routes/exercise/categoryRoutes.js";
import subcategoryRoutes from "./routes/exercise/subCategoryRoutes.js";
import exerciseRoutes from "./routes/exercise/exerciseRoutes.js";
import cors from "cors";
import dietCategoryRoute from "./routes/nutrition/dietCategoryRoute.js";
import dietSubcategoryRoute from './routes/nutrition/dietSubcategoryRoute.js';
import dietRoute from './routes/nutrition/dietRoute.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'))

connectDB();

// app.use('/api/auth', authRoutes);
// app.use('/api/profile', profileRoutes);
app.use("/api/exercise/categories", categoryRoutes);
app.use("/api/exercise/subcategories", subcategoryRoutes);
app.use("/api/exercise/workout", exerciseRoutes);
// app.use('/api/exercise/workout', workoutRoutes);
app.use('/api/nutrition/categories', dietCategoryRoute);
app.use('/api/nutrition/subcategories', dietSubcategoryRoute);
app.use('/api/nutrition/diet', dietRoute);



const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
