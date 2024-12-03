import React, { useEffect, useState } from "react";
import "./Vacancies.css";
import search from "../../images2/svg/Search.svg";
import { Link } from "react-router-dom";

function Vacancies() {
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
  return (
    <section className="vacancies">
      <div className="vacancies__container">
        {/* <div>
          <div className="vacancies__top">
            <h1 className="vacanciest__title-mobile">Отделения</h1>
            <button
              type="button"
              className="vacancies__form-button-mobile"
              onClick={openModal}
            >
              Записаться
            </button>
          </div>
          <form
            className="vacancies__form-mobile"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="vacancies__search-wrapper">
              <input
                className="vacancies__search-input-mobile"
                placeholder="Поиск"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img
                src={search}
                alt="Search Icon"
                className="vacancies__search-icon"
              />
            </div>
          </form>
        </div> */}
				<div className="departments-list__filter-container">
          <h1 className="departments-list__title">Отделения</h1>
          <div
            className={`departments-list__filter ${
              isScrolled ? "scrolled" : ""
            }`}
          >
            <button
              className="departments-list__filter-button"
              onClick={() => setSelectedCategory("")}
            >
              Показать все
            </button>
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
                selectedCategory === "Патологоанатомическое"
                  ? "active-button"
                  : ""
              }`}
              onClick={() => setSelectedCategory("Патологоанатомическое")}
            >
              Патологоанатомическое
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vacancies;
