const pool = require("../config/db");

const getAllPaidServicesEmployers = async (req, res) => {
	try {
		const result = await pool.query(
			`SELECT 
			e.id, 
			e.full_name, 
			e.start_experience, 
			COALESCE(d.name, 'Без отделения') AS department_name,
			p_main.name AS main_position,
			ep_main.photo_url AS main_photo,
			array_agg(DISTINCT p.name) FILTER (WHERE p.name IS NOT NULL AND p.name != p_main.name) AS positions
	 FROM paid_services_doctors psd
	 JOIN employers e ON psd.employer_id = e.id
	 LEFT JOIN dept d ON e.dept_id = d.id

	 -- Получаем основную должность
	 LEFT JOIN employers_post empp_main ON e.id = empp_main.employers_id AND empp_main.is_main = TRUE
	 LEFT JOIN post p_main ON empp_main.post_id = p_main.id

	 -- Получаем все остальные должности
	 LEFT JOIN employers_post empp ON e.id = empp.employers_id
	 LEFT JOIN post p ON empp.post_id = p.id

	 -- Получаем главное фото
	 LEFT JOIN employers_photo ep_main ON e.id = ep_main.employers_id AND ep_main.is_main = TRUE

	 WHERE psd.archived = FALSE
	 GROUP BY e.id, e.full_name, e.start_experience, d.name, p_main.name, ep_main.photo_url;`
		);
		res.json(result.rows);
	} catch (error) {
		console.error("Ошибка при получении всех врачей платных услуг:", error);
		res.status(500).json({ error: "Ошибка сервера" });
	}
}

const getPaidServicesEmployers = async (req, res) => {
	try {
		const departmentId = req.params.id; // Получаем id из параметра маршрута
		const result = await pool.query(
			`SELECT e.id, e.full_name, e.start_experience, 
			        COALESCE(d.name, 'Без отделения') AS department_name
			 FROM paid_services_doctors psd
			 JOIN employers e ON psd.employer_id = e.id
			 LEFT JOIN dept d ON psd.department_id = d.id
			 WHERE psd.archived = FALSE AND psd.department_id = $1;`,
			[departmentId]
		);
		res.json(result.rows);
	} catch (error) {
		console.error("Ошибка при получении врачей платных услуг:", error);
		res.status(500).json({ error: "Ошибка сервера" });
	}
};

module.exports = { getPaidServicesEmployers, getAllPaidServicesEmployers };
