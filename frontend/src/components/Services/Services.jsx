import React from "react";
import "./Services.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import reception from "../../images2/svg/reception.svg";

function Services() {
  return (
    <section className="services">
      <div className="services__container">
        <div className="services__top">
          <h1 className="services__title">Наши услуги</h1>
          <Button
            to="/patient-info"
            className="services__button"
            color="primary"
            size="small"
          >
            Все
          </Button>
        </div>
        <div className="services__cards">
          <div className="services__card">
            <img
              className="services__card-image"
              src={"http://24gkb.ru/images-svg/services1.png"}
              alt="Фото сервиса"
            />
            <h2 className="services__card-title services-title-1">
              У вас направление к нам?
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
              src={"http://24gkb.ru/images-svg/services2.png"}
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
              src={reception}
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
