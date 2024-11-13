import React from "react";
import "./HelpMain.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

function HelpMain() {
  return (
    <section className="help-main">
      <div className="help-main__container">
        <img
          className="help-main__banner"
          src={"http://24gkb.ru/images-svg/help-main.png"}
          alt="Баннер блока для родственников"
        />
        <div className="help-main__text-container">
          <h1 className="help-main__title">Если ваш близкий у нас</h1>
          <p className="help-main__text">
            Важные телефоны, график и правила посещения пациентов в отделениях и
            ОРИТ, проезд и пропуск транспорта на территорию больницы
          </p>
          <div className="help-main__button-container">
            <Link to="/visitors" className="help-main__button">
              Узнать больше
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HelpMain;
