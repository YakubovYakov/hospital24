import React, {useState} from "react";
import "./Preview.css";

function Preview() {

	const [selectedOption, setSelectedOption] = useState("services");
	
	const handleOptionChange = () => {
		setSelectedOption(event.target.value);
	}

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
              <details className="preview__details">
                <summary className="preview__summary">
                  Отделение
                  <span className="preview__details-marker"></span>
                </summary>
              </details>
              <button className="preview__search-button" type="submit">
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
