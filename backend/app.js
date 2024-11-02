// app.js
const express = require("express");
const cors = require("cors"); // Импортируем cors

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

app.use("/api/employers", employersRoutes);
app.use("/api/departments", departmentsRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
