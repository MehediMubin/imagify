import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/mongodb.js";
import imageRouter from "./routes/imageRoutes.js";
import userRouter from "./routes/userRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
await connectDB();

app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);

app.get("/", (req, res) => {
   res.send("API Working!");
});

app.listen(PORT, () => {
   console.log(`Server running on port: ${PORT}`);
});
