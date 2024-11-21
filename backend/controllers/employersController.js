// controllers/employersController.js
const pool = require("../config/db");

const getAllEmployers = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        e.id, 
        e.full_name, 
        e.start_experience, 
        d.name AS department_name,

        -- Positions
        COALESCE(
          (
            SELECT ARRAY_AGG(p.name ORDER BY ep2.ord)
            FROM employers_post ep2
            JOIN post p ON p.id = ep2.post_id
            WHERE ep2.employers_id = e.id
          ),
          '{}'
        ) AS positions,

        -- Photos
        COALESCE(
          (
            SELECT ARRAY_AGG(ep.photo_url ORDER BY ep.is_main DESC, ep.id ASC)
            FROM employers_photo ep
            WHERE ep.employers_id = e.id
          ),
          '{}'
        ) AS photos

      FROM employers e
      LEFT JOIN dept d ON e.dept_id = d.id

      WHERE e.archived = false
      GROUP BY e.id, d.name
      ORDER BY e.id;
      `
    );

    res.json({
      data: result.rows,
      totalItems: result.rows.length,
    });
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
          (
            SELECT ARRAY_AGG(ep.photo_url ORDER BY ep.is_main DESC, ep.id ASC)
            FROM employers_photo ep
            WHERE ep.employers_id = e.id
          ),
          '{}'
        ) AS photos,

        -- Positions
        COALESCE(
          (
            SELECT ARRAY_AGG(p.name ORDER BY ep2.ord)
            FROM employers_post ep2
            JOIN post p ON p.id = ep2.post_id
            WHERE ep2.employers_id = e.id
          ),
          '{}'
        ) AS positions,

        -- Descriptions
        COALESCE(
          (
            SELECT ARRAY_AGG(ed.description)
            FROM employers_description ed
            WHERE ed.employers_id = e.id
          ),
          '{}'
        ) AS descriptions,

        -- Education
        COALESCE(
          (
            SELECT ARRAY_AGG(JSON_BUILD_OBJECT('year', ee.years, 'text', ee.education) ORDER BY ee.years)
            FROM employers_education ee
            WHERE ee.employers_id = e.id
          ),
          '{}'
        ) AS education,

        -- Experiences
        COALESCE(
          (
            SELECT ARRAY_AGG(
              JSON_BUILD_OBJECT('date', ex.date_period, 'text', ex.experience)
              ORDER BY ex.ord ASC -- Изменили сортировку здесь
            )
            FROM employers_experience ex
            WHERE ex.employers_id = e.id
          ),
          '{}'
        ) AS experiences

      FROM employers e
      LEFT JOIN dept d ON e.dept_id = d.id

      WHERE e.id = $1 AND e.archived = false -- Exclude archived records
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

const searchEmployers = async (req, res) => {
  try {
    const searchTerm = req.query.query;
    if (!searchTerm) {
      // Если поисковый запрос пустой, возвращаем пустой массив
      return res.json([]);
    }
    const result = await pool.query(
      `SELECT id, full_name FROM employers WHERE full_name ILIKE $1`,
      [`%${searchTerm}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при поиске врачей:", error);
    res.status(500).json({ error: "Ошибка при поиске врачей" });
  }
};


module.exports = { getEmployerById, getAllEmployers, searchEmployers };
