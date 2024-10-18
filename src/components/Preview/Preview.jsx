import React, { useState, useRef, useEffect } from "react";
import "./Preview.css";

function Preview() {
  const [selectedOption, setSelectedOption] = useState("services");
  const [isButtonFocused, setIsButtonFocused] = useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(true);
  const searchButtonRef = useRef(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setIsButtonFocused(false); // Сбрасываем фокус при смене радиокнопки
    setIsSummaryVisible(true); // Показываем summary при смене радиокнопки
  };

  useEffect(() => {
    if (selectedOption === "on-the-website") {
      searchButtonRef.current.focus();
      setIsButtonFocused(true);
      setTimeout(() => {
        setIsSummaryVisible(false); // Скрываем summary через 300ms
      }, 300);
    } else {
      setIsButtonFocused(false);
      setIsSummaryVisible(true); // Возвращаем summary для остальных опций
    }
  }, [selectedOption]);

  const getPlaceholder = () => {
    switch (selectedOption) {
      case "services":
        return "Введите название услуги";
      case "doctors":
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
      case "doctors":
        return "Выберите врача";
      case "department":
        return "Выберите отделение";
      case "on-the-website":
        return "Поиск по сайту";
      default:
        return "Выберите опцию";
    }
  };

  const handleButtonClick = () => {
    if (selectedOption === "on-the-website") {
      setIsButtonFocused(true);
      setTimeout(() => {
        setIsSummaryVisible(false); // Скрываем summary через 300ms
      }, 300);
    }
  };

  return (
    <section className="preview">
      <div className="preview__background">
        <div className="preview__search">
          <form action="/submit" className="preview__form">
            <h1 className="preview__title">Хочу найти</h1>
            <fieldset className="preview__options">
              <label className="preview__label">
                <input
                  type="radio"
                  name="searchOption"
                  value="services"
                  className="preview__radio"
                  checked={selectedOption === "services"}
                  onChange={handleOptionChange}
                />
                Услугу
              </label>
              <label className="preview__label">
                <input
                  type="radio"
                  name="searchOption"
                  value="doctors"
                  className="preview__radio"
                  checked={selectedOption === "doctors"}
                  onChange={handleOptionChange}
                />
                Врача
              </label>
              <label className="preview__label">
                <input
                  type="radio"
                  name="searchOption"
                  value="department"
                  className="preview__radio"
                  checked={selectedOption === "department"}
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
              />
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
                type="submit"
                ref={searchButtonRef}
                onClick={handleButtonClick}
              >
                Найти
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Preview;
