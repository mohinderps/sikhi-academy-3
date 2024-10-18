import express from "express";
import cors from "cors";
import adminSaakhiRoutes from "./routes/admin.saakhi.routes";
import adminGuruJiRoutes from "./routes/admin.guruJi.routes";
import saakhiRoutes from "./routes/saakhi.routes";
import miscRoutes from "./routes/misc.routes";

const app = express();

const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = isProduction
  ? ["https://sikhiacademy.com"]
  : ["http://localhost:8080"];

app.use(
  cors({
    optionsSuccessStatus: 200,
    origin: (origin, callback) => {
      if (!origin) {
        // Allow requests with no origin (like mobile apps or curl requests)
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.send("pong");
});

app.use("/api/admin/saakhi", adminSaakhiRoutes);
app.use("/api/admin/guru-ji", adminGuruJiRoutes);
app.use("/api/saakhi", saakhiRoutes);
app.use("/api/misc", miscRoutes);

export default app;
