// controllers/employersPostController.js
const pool = require("../config/db");

const getEmployerPostsById = async (req, res) => {
  try {
    const employerId = req.params.id;
    const result = await pool.query(
      `SELECT p.name AS post_name, ep.is_main
       FROM employers_post ep
       JOIN post p ON p.id = ep.post_id
       WHERE ep.employers_id = $1
       ORDER BY ep.ord`,
      [employerId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ error: "Ошибка при получении должностей врача" });
  }
};

module.exports = { getEmployerPostsById };
