const pool = require("../config/db");


const getFeedbacks = async (req, res) => {
  try {
    const result = await pool.query(`
		SELECT 
        f.id,
        f.feedback_source_id,
        f.emp_id,
        f.full_text,
        f.author,
        to_char(f.feedback_date, 'DD.MM.YYYY') AS feedback_date,
        fs.name AS feedback_source_name,  -- Название источника
        fs.path AS icon_path              -- Иконка источника
      FROM feedback_emp f
      LEFT JOIN feedback_source fs ON f.feedback_source_id = fs.id
      ORDER BY f.feedback_date DESC;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении отзывов:", error);
    res.status(500).json({ error: "Ошибка при загрузке отзывов" });
  }
};

const getDepartmentFeedbacks = async (req, res) => {
  try {
    const deptId = req.params.deptId;
    const result = await pool.query(
      `
      SELECT 
        f.id,
        f.feedback_source_id,
        f.dept_id,
        f.full_text,
        f.author,
        to_char(f.feedback_date, 'DD.MM.YYYY') AS feedback_date,
        fs.name AS feedback_source_name,  -- Название источника
        fs.path AS icon_path,             -- Иконка источника
        d.name AS department_name         -- Название отделения
      FROM feedback_dept f
      LEFT JOIN feedback_source fs ON f.feedback_source_id = fs.id
      LEFT JOIN dept d ON f.dept_id = d.id
      WHERE f.dept_id = $1
      ORDER BY f.feedback_date DESC;
      `,
      [deptId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении отзывов:", error);
    res.status(500).json({ error: "Ошибка при загрузке отзывов" });
  }
};

module.exports = { getFeedbacks, getDepartmentFeedbacks };
