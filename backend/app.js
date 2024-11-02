// app.js
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const employersRoutes = require("./routes/employersRoutes");
const departmentsRoutes = require("./routes/departmentsRoutes");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://62.3.58.57"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());

// Роуты API
app.use("/api/employers", employersRoutes);
app.use("/api/departments", departmentsRoutes);

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
