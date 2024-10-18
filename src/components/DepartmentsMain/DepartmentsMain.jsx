import React from "react";
import "./DepartmentsMain.css";
import { Link } from "react-router-dom";
import { departments } from "../../data/departmentsData";

function DepartmentsMain() {
	
  return (
    <section className="departments-main">
      <div className="services__container">
        <div className="services__top">
          <h1 className="services__title">Наши отделения</h1>
          <button className="services__button">Посмотреть все</button>
        </div>
        <div className="departments-main__wrapper">
          <button className="feedback__prev-button" />

          <div className="departments-main__cards-container">
            <div className="departments-main__card">
              <h2 className="departments-main__card-title">Колопроктология</h2>
              <p className="departments-main__card-text">
                Body text for whatever you d like to say. Add main takeaway
                points, quotes, anecdotesBody text for whatever you d like to
                say. Add ma
              </p>
              <div className="departments-main__card-button_container">
                <Link to={`/departments/1`} className="departments-main__card-button">
                  Подробнее
                </Link>
              </div>
            </div>
            <div className="departments-main__card">
              <h2 className="departments-main__card-title">Гинекология</h2>
              <p className="departments-main__card-text">
                Body text for whatever you d like to say. Add main takeaway
                points, quotes, anecdotesBody text for whatever you d like to
                say. Add ma
              </p>
              <div className="departments-main__card-button_container">
                <button className="departments-main__card-button" type="button">
                  Подробнее
                </button>
              </div>
            </div>
            <div className="departments-main__card">
              <h2 className="departments-main__card-title">Аллергология</h2>
              <p className="departments-main__card-text">
                Body text for whatever you d like to say. Add main takeaway
                points, quotes, anecdotesBody text for whatever you d like to
                say. Add ma
              </p>
              <div className="departments-main__card-button_container">
                <button className="departments-main__card-button" type="button">
                  Подробнее
                </button>
              </div>
            </div>
          </div>
          <button className="feedback__next-button" />
        </div>
      </div>
    </section>
  );
}

export default DepartmentsMain;
