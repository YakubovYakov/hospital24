// controllers/employersPostController.js
const pool = require("../config/db");

const getMainEmployerPostById = async (req, res) => {
  try {
    const employerId = req.params.id;
    const result = await pool.query(
      `SELECT p.name AS post_name
       FROM employers_post ep
       JOIN post p ON p.id = ep.post_id
       WHERE ep.employers_id = $1 AND ep.is_main = true
       ORDER BY ep.ord
       LIMIT 1`, 
      [employerId]
    );
    res.json(result.rows[0] || { post_name: "Должность не указана" });
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ error: "Ошибка при получении главной должности врача" });
  }
};

module.exports = { getMainEmployerPostById };
