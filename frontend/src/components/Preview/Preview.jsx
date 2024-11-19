import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Preview.css";
import { searchEntities } from "../../utils/api";

function Preview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchButtonRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 1) { // Поиск начинается с двух символов
      setLoading(true);
      try {
        // Одновременный поиск по врачам и отделениям
        const doctorsResults = await searchEntities(value, "employers");
        const departmentsResults = await searchEntities(value, "departments");

        // Добавляем свойство type к каждому результату врачей
        const doctorsResultsWithType = doctorsResults.map((result) => ({
          ...result,
          type: "employers",
        }));

        // Добавляем свойство type к каждому результату отделений
        const departmentsResultsWithType = departmentsResults.map((result) => ({
          ...result,
          type: "departments",
        }));

        // Объединяем результаты
        const combinedResults = [
          ...doctorsResultsWithType,
          ...departmentsResultsWithType,
        ];

        setResults(combinedResults);
      } catch (error) {
        console.error("Ошибка при поиске:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <section className="preview">
      <div className="preview__background">
        <div className="preview__search">
          <form className="preview__form">
            <h1 className="preview__title">Хочу найти</h1>
            <div className="preview__input-container">
              <input
                className="preview__input"
                placeholder="Введите запрос"
                value={searchTerm}
                onChange={handleInputChange}
              />
              {loading && <div className="preview__loading">Загрузка...</div>}
              {results.length > 0 && (
                <div className="preview__results">
                  <ul className="preview__results-list">
                    {results.map((result) => (
                      <li
                        key={`${result.type}-${result.id}`}
                        className="preview__results-item"
                      >
                        <Link to={`/${result.type}/${result.id}`}>
                          {result.full_name || result.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* <button
                className="preview__search-button"
                type="button"
                ref={searchButtonRef}
              >
                Найти
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Preview;
