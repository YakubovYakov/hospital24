import React, { useState, useRef, useEffect } from "react";
import "./Preview.css";
import Button from "../Button/Button";

function Preview() {
  const searchButtonRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("services");
  const [isButtonFocused, setIsButtonFocused] = useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

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
    }, 300);
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
    setIsButtonFocused(true);
    setTimeout(() => setIsButtonFocused(false), 500);
  };

  return (
    <section className="preview">
      {isMobileView ? (
        <div className="preview__mobile">
          <div className="preview__background-mobile">
            <div className="preview__image-mobile"></div>
          </div>
          <div className="preview__search-mobile">
            <form action="/submit" className="preview__form-mobile">
              <h1 className="preview__title">Хочу найти</h1>
              <fieldset className="preview__options">
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
      ) : (
        <div className="preview__background">
          <div className="preview__search">
            <form action="/submit" className="preview__form">
              <h1 className="preview__title">Хочу найти</h1>

              <fieldset className="preview__options">
                <div className="preview__radio-group">
                  <input
                    type="radio"
                    id="doctors"
                    name="searchOption"
                    value="doctors"
                    className="preview__radio-input"
                    checked={selectedOption === "doctors"}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="doctors" className="preview__label">
                    Врача
                  </label>
                </div>

                <div className="preview__radio-group">
                  <input
                    type="radio"
                    id="department"
                    name="searchOption"
                    value="department"
                    className="preview__radio-input"
                    checked={selectedOption === "department"}
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
      )}
    </section>
  );
}

export default Preview;
