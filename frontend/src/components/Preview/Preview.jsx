import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Preview.css";
import Button from "../Button/Button";
import { searchEntities } from "../../utils/api";

function Preview() {
  const searchButtonRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("employers");
  const [isButtonFocused, setIsButtonFocused] = useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mediaQuery = window.matchMedia("(max-width: 768px)");

  useEffect(() => {
    const handleMediaQueryChange = (e) => {
      setIsMobileView(e.matches);
    };

    handleMediaQueryChange(mediaQuery);

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const handleOptionChange = (event) => {
    setTransitioning(true);
    setTimeout(() => {
      setSelectedOption(event.target.value);
      setTransitioning(false);
      setResults([]);
      setSearchTerm("");
    }, 300);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      setLoading(true);
      try {
        const searchResults = await searchEntities(value, selectedOption); 
        setResults(searchResults);
      } catch (error) {
        console.error("Ошибка при поиске:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const handleButtonClick = () => {
    setIsButtonFocused(true);
    setTimeout(() => setIsButtonFocused(false), 500);
  };

  useEffect(() => {
    if (selectedOption === "on-the-website") {
      searchButtonRef.current.focus();
      setIsButtonFocused(true);
      setTimeout(() => {
        setIsSummaryVisible(false);
      }, 300);
    } else {
      setIsButtonFocused(false);
      setIsSummaryVisible(true);
    }
  }, [selectedOption]);

  const getPlaceholder = () => {
    switch (selectedOption) {
      case "services":
        return "Введите название услуги";
      case "employers":
        return "Введите фамилию врача";
      case "department":
        return "Введите название отделения";
      case "on-the-website":
        return "Поиск на сайте";
      default:
        return "Введите запрос";
    }
  };

  const getSummaryText = () => {
    switch (selectedOption) {
      case "services":
        return "Выберите услугу";
      case "employers":
        return "Выберите специальность";
      case "department":
        return "Выберите отделение";
      case "on-the-website":
        return "Поиск по сайту";
      default:
        return "Выберите опцию";
    }
  };

  return (
    <section className="preview">
      {isMobileView ? (
        <div className="preview__mobile">
          {/* Мобильная версия */}
          <div className="preview__background-mobile">
            <div className="preview__image-mobile"></div>
          </div>
          <div className="preview__search-mobile">
            <form className="preview__form-mobile">
              <h1 className="preview__title">Хочу найти</h1>
              <fieldset className="preview__options">
                <label className="preview__label">
                  <input
                    type="radio"
                    name="searchOption"
                    value="doctors"
                    className="preview__radio"
                    checked={selectedOption === "employers"}
                    onChange={handleOptionChange}
                  />
                  Врача
                </label>
                <label className="preview__label">
                  <input
                    type="radio"
                    name="searchOption"
                    value="departments"
                    className="preview__radio"
                    checked={selectedOption === "departments"}
                    onChange={handleOptionChange}
                  />
                  Отделение
                </label>
                <label className="preview__label">
                  <input
                    type="radio"
                    name="searchOption"
                    value="on-the-website"
                    className="preview__radio"
                    checked={selectedOption === "on-the-website"}
                    onChange={handleOptionChange}
                  />
                  На сайте
                </label>
              </fieldset>
              <div className="preview__input-container">
                <input
                  className="preview__input"
                  placeholder={getPlaceholder()}
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                {loading && <div className="preview__loading">Загрузка...</div>}
                {results.length > 0 && (
                  <ul className="preview__results-list">
                    {results.map((result) => (
                      <li key={result.id} className="preview__results-item">
                        {result.full_name || result.name}
                      </li>
                    ))}
                  </ul>
                )}
                {!isButtonFocused && (
                  <details
                    className={`preview__details ${
                      !isSummaryVisible ? "hidden" : ""
                    }`}
                  >
                    <summary className="preview__summary">
                      <span className="summary-text">{getSummaryText()}</span>
                      <span className="preview__details-marker"></span>
                    </summary>
                  </details>
                )}
                <button
                  className={`preview__search-button ${
                    isButtonFocused ? "expanded" : ""
                  }`}
                  type="button"
                  ref={searchButtonRef}
                  onClick={handleButtonClick}
                >
                  Найти
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="preview__background">
          {/* Десктопная версия */}
          <div className="preview__search">
            <form className="preview__form">
              <h1 className="preview__title">Хочу найти</h1>
              <fieldset className="preview__options">
                <div className="preview__radio-group">
                  <input
                    type="radio"
                    id="employers"
                    name="searchOption"
                    value="employers"
                    className="preview__radio-input"
                    checked={selectedOption === "employers"}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="employers" className="preview__label">
                    Врача
                  </label>
                </div>
                <div className="preview__radio-group">
                  <input
                    type="radio"
                    id="department"
                    name="searchOption"
                    value="departments"
                    className="preview__radio-input"
                    checked={selectedOption === "departments"}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="department" className="preview__label">
                    Отделение
                  </label>
                </div>
                <div className="preview__radio-group">
                  <input
                    type="radio"
                    id="on-the-website"
                    name="searchOption"
                    value="on-the-website"
                    className="preview__radio-input"
                    checked={selectedOption === "on-the-website"}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="on-the-website" className="preview__label">
                    На сайте
                  </label>
                </div>
              </fieldset>
              <div
                className={`preview__input-container ${
                  transitioning ? "transitioning" : ""
                }`}
              >
                <input
                  className="preview__input"
                  placeholder={getPlaceholder()}
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                {loading && <div className="preview__loading">Загрузка...</div>}
                {results.length > 0 && (
                  <div className="preview__results">
                    <ul className="preview__results-list">
                      {results.map((result) => (
                        <li key={result.id} className="preview__results-item">
                          <Link to={`/${selectedOption}/${result.id}`}>
                            {result.full_name || result.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {!isButtonFocused && (
                  <details
                    className={`preview__details ${
                      !isSummaryVisible ? "hidden" : ""
                    }`}
                  >
                    <summary className="preview__summary">
                      <span className="summary-text">{getSummaryText()}</span>
                      <span className="preview__details-marker"></span>
                    </summary>
                  </details>
                )}
                <button
                  className={`preview__search-button ${
                    isButtonFocused ? "expanded" : ""
                  }`}
                  type="button"
                  ref={searchButtonRef}
                  onClick={handleButtonClick}
                >
                  Найти
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Preview;
