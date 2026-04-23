import express from "express";
import morgan from "morgan";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";


import dotenv from "dotenv";
dotenv.config();

connectDB().then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log(err)
})

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // max 100 requests per IP
    message: "Too many requests, try again later"
});

app.use(limiter);
app.set("trust proxy", 1);

const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5, // only 5 attempts
    message: "Too many login attempts, try later"
});
// routes


app.use("/api/v1/user", userRoutes, authLimiter);
app.use("/api/v1/notes", notesRoutes);


// Health Check Route
app.get("/", (req, res) => {
    res.json({ message: "Notes App Backend is successfully running! 🚀" });
});

// 🚀 Start server
app.listen(3005, () => console.log("Server running on port 3005"));