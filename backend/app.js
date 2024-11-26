// app.js
require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const employersRoutes = require("./routes/employersRoutes");
const departmentsRoutes = require("./routes/departmentsRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["http://gkb-24.ru", "http://www.gkb-24.ru", "https://gkb-24.ru", "https://www.gkb-24.ru"]
    : ["http://localhost:5173"];

		app.use(
			cors({
				origin: (origin, callback) => {
					if (!origin || allowedOrigins.includes(origin)) {
						callback(null, true);
					} else {
						callback(new Error("Not allowed by CORS"));
					}
				},
				methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
				credentials: true,
			})
		);

		// app.use(
		// 	cors({
		// 		origin: "*",
		// 		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		// 		credentials: true,
		// 	})
		// );
app.use(express.json());

// Роуты API
app.use("/api/employers", employersRoutes);
app.use("/api/departments", departmentsRoutes);

app.use("/api/feedbacks", feedbackRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
