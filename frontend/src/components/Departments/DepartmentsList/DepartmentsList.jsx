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
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((dept) => (
              <div key={dept.id} className="departments-list__item-container">
                <Link
                  className="departments-list__item"
                  to={`/departments/${dept.id}`}
                >
                  {dept.name}
                </Link>
              </div>
            ))
          ) : (
            <p>Отделение не найдено</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default DepartmentsList;