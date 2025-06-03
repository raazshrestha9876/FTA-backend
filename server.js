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

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5000", "exp://192.168.100.124:8081"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

connectDB();

// app.use('/api/auth', authRoutes);
// app.use('/api/profile', profileRoutes);
app.use("/api/exercise/categories", categoryRoutes);
app.use("/api/exercise/subcategories", subcategoryRoutes);
app.use("/api/exercise/workout", exerciseRoutes);
// app.use('/api/exercise/workout', workoutRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
