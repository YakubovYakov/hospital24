import React, {useEffect} from "react";
// import "./AboutHospital.css";
import { Link } from "react-router-dom";

function Vacancies() {
	useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="about-hospital">
      <div className="about-hospital__container">
        <div className="about-hospital__content">
          <div className="about-hospital__top">
            <h1 className="about-hospital__title">Вакансии</h1>
            <div className="about-hospital__content-text">
              <p className="about-hospital__text">
                Уважаемые пациенты и посетители сайта 24 Московской больницы!
                Страница находится в разработке, скоро здесь будет актуальная
                информация.
              </p>
              <p className="about-hospital__text">
                Неудобства временные, а современный сайт навсегда
              </p>
              <Link className="about-hospital__link" to="/">
                Вернуться на главную страницу
              </Link>
            </div>
          </div>
          <img
            className="about-hospital__image"
            src={"https://62.3.58.57/static/images-svg/about-hospital.svg"}
            alt="Иллюстрация программиста"
          />
        </div>
      </div>
    </section>
  );
}

export default Vacancies;
