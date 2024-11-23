import React from "react";
import "./Services.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

function Services() {
  return (
    <section className="services">
      <div className="services__container">
        <div className="services__cards">
          <div className="services__card">
            <img
              className="services__card-image"
              src={"https://www.gkb-24.ru/static/images-svg/services1.svg"}
              alt="Фото сервиса"
            />
            <h2 className="services__card-title services-title-1">
              У вас направление к нам из поликлиники?
            </h2>
            <p className="services__card-text">
              Вас направили на консультацию, плановую госпитализацию и есть
              направление в ЕМИАС или направление 057у
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
              src={"https://www.gkb-24.ru/static/images-svg/services2.svg"}
              alt="Фото сервиса"
            />
            <h2 className="services__card-title">
              Вы из региона и хотите лечиться у нас по ОМС?
            </h2>
            <p className="services__card-text">
              Пройти лечение, сделать операцию бесплатно по полису ОМС в
              московской больнице очень просто
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
              src="https://www.gkb-24.ru/static/images-svg/reception_main.svg"
              alt="Фото сервиса"
            />
            <h2 className="services__card-title">
              Хотите пройти лечение платно?
            </h2>
            <p className="services__card-text">
              Консультации врачей, операции, различная диагностика, палаты
              повышенной комфортности
            </p>
            <div className="services__card-button_container">
              <Link
                to="/paid-services"
                className="services__card-button"
                color="secondary"
              >
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
