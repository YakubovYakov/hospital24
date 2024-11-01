// controllers/employersController.js
const pool = require("../config/db");

const getAllEmployers = async (req, res) => {
  try {
    const result = await pool.query(`
		SELECT 
		e.id, 
		e.full_name, 
		e.start_experience, 
		d.name AS department_name,
		ARRAY_AGG(ep.photo_url) AS photos -- Собираем фото в массив
	FROM employers e
	LEFT JOIN dept d ON e.dept_id = d.id
	LEFT JOIN employers_photo ep ON e.id = ep.employers_id
	GROUP BY e.id, d.name;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении списка врачей:", error);
    res.status(500).json({ error: "Ошибка при получении списка врачей" });
  }
};

const getEmployerById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        e.id, 
        e.full_name, 
        e.start_experience, 
        d.name AS department_name,

        -- Photos
        COALESCE(
          ARRAY_AGG(DISTINCT ep.photo_url) 
          FILTER (WHERE ep.photo_url IS NOT NULL), 
          '{}'
        ) AS photos,

        -- Positions
        COALESCE(
          ARRAY_AGG(DISTINCT p.name) 
          FILTER (WHERE p.name IS NOT NULL), 
          '{}'
        ) AS positions,

        -- Descriptions
        COALESCE(
          ARRAY_AGG(DISTINCT ed.description) 
          FILTER (WHERE ed.description IS NOT NULL), 
          '{}'
        ) AS descriptions,

        -- Education
        COALESCE((
          SELECT 
            ARRAY_AGG(JSON_BUILD_OBJECT('year', ee_sub.years, 'text', ee_sub.education))
          FROM (
            SELECT DISTINCT ee.years, ee.education
            FROM employers_education ee
            WHERE ee.employers_id = e.id AND ee.education IS NOT NULL
          ) ee_sub
        ), '{}') AS education,

        -- Experiences
        COALESCE((
          SELECT 
            ARRAY_AGG(JSON_BUILD_OBJECT('date', ex_sub.date_period, 'text', ex_sub.experience))
          FROM (
            SELECT DISTINCT ex.date_period, ex.experience
            FROM employers_experience ex
            WHERE ex.employers_id = e.id AND ex.experience IS NOT NULL
          ) ex_sub
        ), '{}') AS experiences

      FROM employers e
      LEFT JOIN dept d ON e.dept_id = d.id
      LEFT JOIN employers_post ep2 ON e.id = ep2.employers_id
      LEFT JOIN post p ON p.id = ep2.post_id
      LEFT JOIN employers_photo ep ON e.id = ep.employers_id
      LEFT JOIN employers_description ed ON e.id = ed.employers_id

      WHERE e.id = $1
      GROUP BY e.id, d.name;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Врач не найден" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ message: "Ошибка на сервере" });
  }
};

module.exports = { getEmployerById, getAllEmployers };
