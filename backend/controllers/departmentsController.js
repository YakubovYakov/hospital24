const pool = require("../config/db");

const getAllDepartments = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM dept");
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении отделений:", error);
    res.status(500).json({ error: "Ошибка при загрузке отделений" });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      ` SELECT 
			d.id,
			d.name,
			d.location,
			COALESCE(
				ARRAY_AGG(dd.description ORDER BY dd.id) FILTER (WHERE dd.description IS NOT NULL), 
				'{}'
			) AS descriptions
		FROM dept d
		LEFT JOIN dept_description dd ON d.id = dd.dept_id
		WHERE d.id = $1
		GROUP BY d.id;`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Отделение не найдено" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка при получении данных отделения:", error);
    res.status(500).json({ message: "Ошибка на сервере" });
  }
};

const getDepartmentHead = async (req, res) => {
  const { departmentId } = req.params;
  try {
    const result = await pool.query(
      `
			SELECT 
        e.id, 
        e.full_name AS head_doctor_title, 
        ep.photo_url AS head_doctor_photo, 
        ed.description AS head_doctor_description,
        ARRAY_AGG(DISTINCT p.name) AS head_doctor_positions  -- собираем должности в массив
      FROM 
        department_head dh
      JOIN 
        employers e ON dh.employer_id = e.id
      LEFT JOIN 
        employers_photo ep ON e.id = ep.employers_id AND ep.is_main = true
      LEFT JOIN 
        dept_description ed ON dh.department_id = ed.dept_id
      LEFT JOIN 
        employers_post epo ON e.id = epo.employers_id  -- подключаем таблицу с должностями
      LEFT JOIN 
        post p ON epo.post_id = p.id  -- подключаем таблицу с названиями должностей
      WHERE 
        dh.department_id = $1
      GROUP BY 
        e.id, ep.photo_url, ed.description;
			`,
      [departmentId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка при получении главного врача:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const getDepartmentDoctors = async (req, res) => {
  const { departmentId } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
			e.id AS doctor_id,
			e.full_name AS doctor_card_title,
			p.photo_url AS doctor_card_photo,
			ARRAY_AGG(DISTINCT post.name) AS doctor_card_description
		FROM employers e
		LEFT JOIN employers_photo p ON e.id = p.employers_id AND p.is_main = true
		LEFT JOIN employers_post ep ON e.id = ep.employers_id
		LEFT JOIN post ON ep.post_id = post.id
		WHERE e.dept_id = $1
		GROUP BY e.id, p.photo_url`,
      [departmentId]
    );

    if (result.rows.length === 0) {
      // Отправляем пустой массив, если врачи не найдены
      return res.json([]);
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении врачей отдела:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  getDepartmentHead,
  getDepartmentDoctors,
};
