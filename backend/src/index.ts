import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

app.get("/api/saakhis/:id", (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  const saakhi = {
    id: "1",
    title: "Saakhi 1",
    content: "Content of Saakhi 1",
    guruJiName: "Guru Nanak Dev Ji",
  };
  res.json(saakhi);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
