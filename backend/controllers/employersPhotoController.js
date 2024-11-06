const pool = require("../config/db");

const getEmployerPhotosById = async (req, res) => {
  try {
    const employerId = req.params.id;
    const result = await pool.query(
      `SELECT photo_url, is_main
       FROM employers_photo
       WHERE employers_id = $1`,
      [employerId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ error: "Ошибка при получении фотографий врача" });
  }
};

module.exports = { getEmployerPhotosById };
