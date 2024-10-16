import express from "express";
import cors from "cors";
// import adminSaakhiRoutes from "./routes/admin/saakhi";
import adminGuruJiRoutes from "./routes/admin.guruJi.router";

const app = express();

app.use(
  cors({
    origin: "https://sikhiacademy.com",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// app.use("/api/admin/saakhi", adminSaakhiRoutes);
app.use("/api/admin/guru-ji", adminGuruJiRoutes);

app.get("/api/ping", (req, res) => {
  res.send("pong");
});

app.post("/api/initial-data", (req, res) => {
  const { lastReadSaakhiId, likedSaakhis, bookmarkedSaakhis } = req.body;
  //   console.log(lastReadSaakhiId, likedSaakhis, bookmarkedSaakhis);
  const response = {
    saakhisCount: 1,
    firstSaakhi: {
      id: "1",
      title: "Saakhi 1",
      guruJiName: "Guru Nanak Dev Ji",
    },
    lastReadSaakhi: {
      id: "1",
      title: "Saakhi 1",
      guruJiName: "Guru Nanak Dev Ji",
    },
    likedSaakhis: [],
    bookmarkedSaakhis: [],
  };
  res.json(response);
});

// app.get("/api/saakhis/:id", (req, res) => {
//   const { id } = req.params;
//   const saakhi = {
//     id: "1",
//     title: "Saakhi 1",
//     content: "Content of Saakhi 1",
//     guruJiName: "Guru Nanak Dev Ji",
//   };
//   res.json(saakhi);
// });

export default app;
