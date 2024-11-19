const pool = require("../config/db");

const getAllDepartments = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, category, photo_url FROM dept ORDER BY category, name"
    );
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
      `SELECT 
			d.id,
			d.name,
			d.location,
			d.photo_url,
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
			p_main.name AS main_post, -- Извлекаем главную должность
			ARRAY_AGG(DISTINCT p.name) AS head_doctor_positions -- Собираем все должности в массив
			FROM 
				department_head dh
			JOIN 
				employers e ON dh.employer_id = e.id
			LEFT JOIN 
				employers_photo ep ON e.id = ep.employers_id AND ep.is_main = true
			LEFT JOIN 
				dept_description ed ON dh.department_id = ed.dept_id
			LEFT JOIN 
				employers_post epo ON e.id = epo.employers_id -- Присоединяем все должности
			LEFT JOIN 
				post p ON epo.post_id = p.id -- Названия всех должностей
			LEFT JOIN 
				employers_post epo_main ON e.id = epo_main.employers_id AND epo_main.is_main = true -- Главная должность
			LEFT JOIN 
				post p_main ON epo_main.post_id = p_main.id -- Название главной должности
			WHERE 
				dh.department_id = $1
			GROUP BY 
			e.id, ep.photo_url, ed.description, p_main.name;
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
      `
      SELECT 
        e.id AS doctor_id,
        e.full_name AS doctor_card_title,
        e.start_experience,
        -- Positions
        COALESCE(
          (
            SELECT ARRAY_AGG(p.name ORDER BY ep2.ord)
            FROM employers_post ep2
            JOIN post p ON p.id = ep2.post_id
            WHERE ep2.employers_id = e.id
          ),
          '{}'
        ) AS doctor_card_description,
        -- Photos
        COALESCE(
          (
            SELECT ep.photo_url
            FROM employers_photo ep
            WHERE ep.employers_id = e.id AND ep.is_main = true
            ORDER BY ep.id ASC
            LIMIT 1
          ),
          ''
        ) AS doctor_card_photo
      FROM employers e
      LEFT JOIN department_head dh ON e.id = dh.employer_id AND dh.department_id = $1
      WHERE e.dept_id = $1 AND e.archived = false AND dh.employer_id IS NULL
      ORDER BY e.id;
      `,
      [departmentId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении врачей отдела:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const searchDepartments = async (req, res) => {
  try {
    const searchTerm = req.query.query;
    if (!searchTerm) {
      return res.json([]);
    }
    const result = await pool.query(
      `SELECT id, name FROM dept WHERE name ILIKE $1`,
      [`%${searchTerm}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при поиске отделений:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  getDepartmentHead,
  getDepartmentDoctors,
  searchDepartments,
};
