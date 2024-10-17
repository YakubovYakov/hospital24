import React from "react";
import "./Departments.css";

function Departments() {
  return (
    <section className="departments">
      <div className="services__container">
        <div className="services__top">
          <h1 className="services__title">Наши отделения</h1>
          <button className="services__button">Посмотреть все</button>
        </div>
        <div className="departments__wrapper">
          <button className="feedback__prev-button" />

          <div className="departments__cards-container">
            <div className="departments__card">
              <h2 className="departments__card-title">Колопроктология</h2>
              <p className="departments__card-text">
                Body text for whatever you d like to say. Add main takeaway
                points, quotes, anecdotesBody text for whatever you d like to
                say. Add ma
              </p>
              <div className="departments__card-button_container">
                <button className="departments__card-button" type="button">
                  Подробнее
                </button>
              </div>
            </div>
            <div className="departments__card">
              <h2 className="departments__card-title">Гинекология</h2>
              <p className="departments__card-text">
                Body text for whatever you d like to say. Add main takeaway
                points, quotes, anecdotesBody text for whatever you d like to
                say. Add ma
              </p>
              <div className="departments__card-button_container">
                <button className="departments__card-button" type="button">
                  Подробнее
                </button>
              </div>
            </div>
            <div className="departments__card">
              <h2 className="departments__card-title">Аллергология</h2>
              <p className="departments__card-text">
                Body text for whatever you d like to say. Add main takeaway
                points, quotes, anecdotesBody text for whatever you d like to
                say. Add ma
              </p>
              <div className="departments__card-button_container">
                <button className="departments__card-button" type="button">
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

export default Departments;
