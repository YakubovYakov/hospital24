import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../../utils/api";
import "./DepartmentsList.css";
import search from "../../../images2/svg/Search.svg";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

function DepartmentsList() {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

	useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categoryOrder = [
    "Экстренная помощь",
    "Консультации",
    "Хирургия",
    "Терапия",
    "Диагностика",
  ];

	const groupedDepartments = departments.reduce((acc, dept) => {
    if (!dept.category) {
      dept.category = " ";
    }
    if (!acc[dept.category]) {
      acc[dept.category] = [];
    }
    acc[dept.category].push(dept);
    return acc;
  }, {});

  const sortedCategory = Object.keys(groupedDepartments).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);

    return (
      (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB)
    );
  });

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await fetchDepartments();
        setDepartments(data);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке данных отделений:", error);
        setError("Не удалось загрузить данные отделений.");
        setLoading(false);
      }
    };
    loadDepartments();
  }, []);



  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name && dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Загрузка данных...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="departments-list">
      <div className="departments-list__container">
        <form
          className="departments-list__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="departments-list__search-wrapper">
            <input
              className="departments-list__search-input"
              placeholder="Поиск"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              src={search}
              alt="Search Icon"
              className="departments-list__search-icon"
            />
          </div>
        </form>
        <div className="departments-list__list">
          {sortedCategory.map((category) => (
            <div key={category} className={`departments-list__category ${category === " " ? "departments-list__no-category" : ""}`}>
              <h2 className="departments-list__category-title">{category || " "}</h2>
              {groupedDepartments[category]
                .filter((dept) =>
                  dept.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((dept) => (
                  <div
                    key={dept.id}
                    className="departments-list__item-container"
                  >
                    <Link
                      className="departments-list__item"
                      to={`/departments/${dept.id}`}
                    >
                      {dept.name}
                    </Link>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DepartmentsList;
