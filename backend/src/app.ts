import express from "express";
import cors from "cors";
import adminSaakhiRoutes from "./routes/admin.saakhi.routes";
import adminGuruJiRoutes from "./routes/admin.guruJi.routes";
import saakhiRoutes from "./routes/saakhi.routes";
import miscRoutes from "./routes/misc.routes";

const app = express();

app.use(
  cors({
    origin: "https://sikhiacademy.com",
    optionsSuccessStatus: 200,
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
