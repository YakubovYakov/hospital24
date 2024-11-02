// controllers/employersExperienceController.js
const pool = require("../config/db");

const getEmployerExperienceById = async (req, res) => {
  try {
    const employerId = req.params.id;
    const result = await pool.query(
      `SELECT experience, date_period
       FROM employers_experience
       WHERE employers_id = $1
       ORDER BY ord`,
      [employerId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ error: "Ошибка при получении опыта работы врача" });
  }
};

module.exports = { getEmployerExperienceById };