import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../../utils/api";
import "./DepartmentsList.css";
import search from "../../../images/svg/Search.svg";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

function DepartmentsList() {
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  const totalPages = Math.ceil(filteredDepartments.length / ITEMS_PER_PAGE);
  const currentDepartments = filteredDepartments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

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
          {currentDepartments.length > 0 ? (
            currentDepartments.map((dept) => (
              <div key={dept.id} className="departments-list__item-container">
                <Link className="departmets-list__item" to={`/departments/${dept.id}`}>{dept.name}</Link>
              </div>
            ))
          ) : (
            <p>Отделение не найдено</p>
          )}
        </div>
        <div className="departments-list__page-numbers">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="departments-list__prev-button"
          ></button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`departments-list__page-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="departments-list__next-button"
          ></button>
        </div>
      </div>
    </section>
  );
}

export default DepartmentsList;
