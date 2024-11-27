import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../../utils/api";
import "./DepartmentsList.css";
import search from "../../../images2/svg/Search.svg";
import { Link } from "react-router-dom";
import DoctorAppointmentModal from "../../Doctors/DoctorAppointmentModal/DoctorAppointmentModal";

function DepartmentsList() {

  const [departments, setDepartments] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categoryOrder = [
    "Экстренная помощь",
    "Консультации",
    "Хирургия",
    "Терапия",
    "Диагностика",
    "Анестезиология",
    "Гемодиализ",
    "Рассеянный склероз",
    "Реабилитация",
    "Патологоанатомическое",
    "Анестезиология",
  ];

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await fetchDepartments();
        // Присваиваем категории отделениям без категории
        const processedData = data.map((dept) => {
          if (!dept.category || dept.category.trim() === "") {
            if (dept.name === "Анестезиология") {
              dept.category = "Анестезиология";
            } else if (dept.name === "Гемодиализ") {
              dept.category = "Гемодиализ";
            } else if (
              dept.name === "Межокружное отделение рассеянного склероза"
            ) {
              dept.category = "Рассеянный склероз";
            } else if (
              dept.name === "Отделение ранней медицинской реабилитации" ||
              dept.name === "Отделение реабилитации стомированных больных"
            ) {
              dept.category = "Реабилитация";
            } else if (dept.name === "Патологоанатомическое отделение") {
              dept.category = "Патологоанатомическое";
            } else {
              dept.category = "Анестезиология";
            }
          }
          return dept;
        });
        setDepartments(processedData);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке данных отделений:", error);
        setError("Не удалось загрузить данные отделений.");
        setLoading(false);
      }
    };
    loadDepartments();
  }, []);

  const groupedDepartments = departments.reduce((acc, dept) => {
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

  if (loading) return <div>Загрузка данных...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="departments-list">
      <div className="departments-list__container">
        {isModalOpen && <DoctorAppointmentModal onClose={closeModal} />}
        <div className="departments-list__filter-container">
          <h1 className="departments-list__title">Отделения</h1>
          <div
            className={`departments-list__filter ${
              isScrolled ? "scrolled" : ""
            }`}
          >
            {/* Кнопки всегда видимы */}
            <button
              className={`departments-list__filter-button ${
                selectedCategory === "Экстренная помощь" ? "active-button" : ""
              }`}
              onClick={() => setSelectedCategory("Экстренная помощь")}
            >
              Экстренная помощь
            </button>
            <button
              className={`departments-list__filter-button ${
                selectedCategory === "Консультации" ? "active-button" : ""
              }`}
              onClick={() => setSelectedCategory("Консультации")}
            >
              Консультации
            </button>
            <button
              className={`departments-list__filter-button ${
                selectedCategory === "Хирургия" ? "active-button" : ""
              }`}
              onClick={() => setSelectedCategory("Хирургия")}
            >
              Хирургия
            </button>
            <button
              className={`departments-list__filter-button ${
                selectedCategory === "Терапия" ? "active-button" : ""
              }`}
              onClick={() => setSelectedCategory("Терапия")}
            >
              Терапия
            </button>
            <button
              className={`departments-list__filter-button ${
                selectedCategory === "Диагностика" ? "active-button" : ""
              }`}
              onClick={() => setSelectedCategory("Диагностика")}
            >
              Диагностика
            </button>
            <button
              className={`departments-list__filter-button ${
                selectedCategory === "Анестезиология" ? "active-button" : ""
              }`}
              onClick={() => setSelectedCategory("Анестезиология")}
            >
              Анестезиология
            </button>
            <button
              className={`departments-list__filter-button ${
                selectedCategory === "Гемодиализ" ? "active-button" : ""
              }`}
              onClick={() => setSelectedCategory("Гемодиализ")}
            >
              Гемодиализ
            </button>
            <button
              className={`departments-list__filter-button ${
                selectedCategory === "Рассеянный склероз" ? "active-button" : ""
              }`}
              onClick={() => setSelectedCategory("Рассеянный склероз")}
            >
              Рассеянный склероз
            </button>
            <button
              className={`departments-list__filter-button ${
                selectedCategory === "Реабилитация" ? "active-button" : ""
              }`}
              onClick={() => setSelectedCategory("Реабилитация")}
            >
              Реабилитация
            </button>
            <button
              className={`departments-list__filter-button ${
                selectedCategory === "Патологоанатомическое" ? "active-button" : ""
              }`}
              onClick={() => setSelectedCategory("Патологоанатомическое")}
            >
              Патологоанатомическое
            </button>
            <button
              className="departments-list__filter-button"
              onClick={() => setSelectedCategory("")}
            >
              Показать все
            </button>
          </div>
        </div>

        <div>
          <div className="departments-list__wrapper">
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
            <button
              type="button"
              className="departments-list__form-button"
              onClick={openModal}
            >
              Записаться
            </button>
          </div>
          <div className="departments-list__list">
            {sortedCategory.map((category) => {
              // Если выбрана категория, отображаем только ее
              if (selectedCategory && category !== selectedCategory) {
                return null;
              }

              const filteredDepartments = groupedDepartments[category]?.filter(
                (dept) =>
                  dept.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              );

              if (!filteredDepartments || filteredDepartments.length === 0) {
                return null;
              }

              return (
                <div
                  key={category}
                  className={`departments-list__category ${
                    category === " " ? "departments-list__no-category" : ""
                  }`}
                >
                  <h2 className="departments-list__category-title">
                    {category}
                  </h2>

                  {filteredDepartments.map((dept) => (
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DepartmentsList;
