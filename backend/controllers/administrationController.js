const pool = require("../config/db");

const getAdministartors = async (req, res) => {
  try {
    const result = await pool.query(
      `
			SELECT 
        e.id,
        e.full_name,
        e.administration_category,
        ep.photo_url,
        ep.is_main,
        p.name AS position_name,
        epst.is_main AS position_is_main
      FROM employers e
      LEFT JOIN employers_photo ep ON e.id = ep.employers_id AND ep.is_main = TRUE
      LEFT JOIN employers_post epst ON e.id = epst.employers_id AND epst.is_main = TRUE
      LEFT JOIN post p ON epst.post_id = p.id
      WHERE e.is_administration = TRUE
      ORDER BY e.administration_category, e.id;
			`
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении администраторов:", error);
    res.status(500).json({ error: "Ошибка при загрузке администраторов" });
  }
};

module.exports = { getAdministartors };
