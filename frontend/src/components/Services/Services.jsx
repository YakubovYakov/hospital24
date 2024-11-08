import React from "react";
import "./Services.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import reception from "../../images/svg/reception.svg";

function Services() {
  return (
    <section className="services">
      <div className="services__container">
        <div className="services__cards">
          <div className="services__card">
            <img
              className="services__card-image"
              src={"https://i.postimg.cc/zDkCxRK2/services1.png"}
              alt="Фото сервиса"
            />
            <h2 className="services__card-title services-title-1">
              У вас направление к нам?
            </h2>
            <p className="services__card-text">
              Консультация и плановая госпитализация пациентов при наличии
              направления в ЕМИАС или формы 057у
            </p>
            <div className="services__card-button_container">
              <Link
                to="/patient-info"
                className="services__card-button"
                color="secondary"
              >
                Узнать больше
              </Link>
            </div>
          </div>
          <div className="services__card">
            <img
              className="services__card-image"
              src={"https://i.postimg.cc/D07q22kc/services2.png"}
              alt="Фото сервиса"
            />
            <h2 className="services__card-title">
              Вы из региона и хотите лечиться у нас по ОМС?
            </h2>
            <p className="services__card-text">
              Консультации, лечение, операции для жителей из регионов и про
              проект "Москва - столица здоровья"
            </p>
            <div className="services__card-button_container">
              <Link
                to="/out-of-town-patients"
                className="services__card-button"
                color="secondary"
              >
                Узнать больше
              </Link>
            </div>
          </div>
          <div className="services__card">
            <img
              className="services__card-image services-image-3"
              src={reception}
              alt="Фото сервиса"
            />
            <h2 className="services__card-title">
              Хотите пройти лечение платно?
            </h2>
            <p className="services__card-text">
              Консультации врачей, операции, различная
              диагностика, палаты повышенной комфортности
            </p>
            <div className="services__card-button_container">
              <Link to="/paid-services" className="services__card-button" color="secondary">
                Узнать больше
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
