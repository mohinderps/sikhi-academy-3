import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Sample data (replace with database in production)
const saakhis = [
  {
    id: "1",
    title: "Saakhi 1",
    content: "Content of Saakhi 1",
    guruJi: "Guru Nanak Dev Ji",
  },
  {
    id: "2",
    title: "Saakhi 2",
    content: "Content of Saakhi 2",
    guruJi: "Guru Angad Dev Ji",
  },
  // Add more saakhis as needed
];

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/api/initial-data", (req, res) => {
  const { lastReadSaakhiId, likedSaakhis, bookmakedSaakhis } = req.body;
  console.log(lastReadSaakhiId, likedSaakhis, bookmakedSaakhis);
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
    likedSaakhis: [
      {
        id: "1",
        title: "Saakhi 1",
        guruJiName: "Guru Nanak Dev Ji",
      },
    ],
    bookmakedSaakhis: [
      {
        id: "1",
        title: "Saakhi 1",
        guruJiName: "Guru Nanak Dev Ji",
      },
    ],
  };
  res.json(response);
});

app.get("/api/saakhis/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
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
