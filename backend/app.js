// app.js
require("dotenv").config(); 

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const employersRoutes = require("./routes/employersRoutes");
const departmentsRoutes = require("./routes/departmentsRoutes");


const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["http://24gkb.ru", "http://www.24gkb.ru"]
    : ["http://localhost:5173"]; // Локальный источник для разработки

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());

// Роуты API
app.use("/api/employers", employersRoutes);
app.use("/api/departments", departmentsRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
