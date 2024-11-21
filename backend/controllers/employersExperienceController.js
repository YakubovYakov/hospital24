// controllers/employersExperienceController.js
const pool = require("../config/db");

const getEmployerExperienceById = async (req, res) => {
  try {
		console.log(`Контроллер getEmployerExperienceById вызван с ID: ${req.params.id}`);
    const employerId = req.params.id;
    const result = await pool.query(
      `SELECT experience AS text, date_period AS date, ord
       FROM employers_experience
       WHERE employers_id = $1
       ORDER BY ord ASC;`, // Сортировка по ord в возрастающем порядке
      [employerId]
    );
    console.log("Полученные данные:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ error: "Ошибка при получении опыта работы врача" });
  }
};


module.exports = { getEmployerExperienceById };
