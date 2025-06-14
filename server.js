import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth/authRoutes.js"
// import profileRoutes from './routes/profileRoutes';
import cookieParser from "cookie-parser";
import categoryRoutes from "./routes/exercise/categoryRoutes.js";
import subcategoryRoutes from "./routes/exercise/subCategoryRoutes.js";
import exerciseRoutes from "./routes/exercise/exerciseRoutes.js";
import cors from "cors";
import dietCategoryRoute from "./routes/nutrition/dietCategoryRoute.js";
import dietSubcategoryRoute from "./routes/nutrition/dietSubcategoryRoute.js";
import dietRoute from "./routes/nutrition/dietRoute.js";
import reviewRoute from './routes/review/reviewRoute.js';

// import botRoute from "./routes/bot/botRoute.js"
// import http from "http";
// import { Socket } from "socket.io";


dotenv.config();

const app = express();

// const server = http.createServer(app);
// const io = new Socket(server);

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

// io.on("connection", (socket) => {
//   console.log("user connected");

//   socket.on("user-message", (message) => {
//     handleUserMessage(socket, message);
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

app.use('/api/auth', authRoutes);
// app.use('/api/profile', profileRoutes);
app.use("/api/exercise/categories", categoryRoutes);
app.use("/api/exercise/subcategories", subcategoryRoutes);
app.use("/api/exercise/workout", exerciseRoutes);
// app.use('/api/exercise/workout', workoutRoutes);
app.use("/api/nutrition/categories", dietCategoryRoute);
app.use("/api/nutrition/subcategories", dietSubcategoryRoute);
app.use("/api/nutrition/diet", dietRoute);
app.use("/api/review", reviewRoute);
// app.use("/api/bot", botRoute );

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
