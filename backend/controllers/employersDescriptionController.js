// controllers/employersDescriptionController.js
const pool = require("../config/db");

const getEmployerDescriptionById = async (req, res) => {
  try {
    const employerId = req.params.id;
    const result = await pool.query(
      `SELECT description
       FROM employers_description
       WHERE employers_id = $1
       ORDER BY ord`,
      [employerId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ error: "Ошибка при получении описания врача" });
  }
};

module.exports = { getEmployerDescriptionById };
