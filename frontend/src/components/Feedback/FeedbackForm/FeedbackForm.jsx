import React, { useState } from "react";
import "./FeedbackForm.css";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import logo from "../../../images2/Logotype.png";

function FeedbackForm({ onClose }) {
  const [activeButton, setActiveButton] = useState("thanks");

  const handleFormSwitch = (formType) => {
    setActiveButton(formType);
  };

  return (
    <div className="feedback-form">
      <div className="feedback-form__container">
        <div className="feedback-form__top">
          <img
            className="feedback-form__logo"
            src={logo}
            alt="Логотип больницы"
          />
          <button onClick={onClose} className="feedback-form__close-button" />
        </div>
        <div className="feedback-form__text-container">
          <h1 className="feedback-form__title">Форма обратной связи</h1>
          <p className="feedback-form__text">
            Не рассматриваются электронные обращения без фамилии и имени
            заявителя, при указании не корректного адреса электронной почты, по
            которому должен быть направлен ответ, сообщения, носящие
            оскорбительный характер, угрозы либо требующие удостоверяющих
            реквизитов (подписи, печати и др.) либо рекламные материалы
          </p>
        </div>
        <div className="feedback-from__buttons-container">
          <button
            className={`feedback-form__button ${
              activeButton === "thanks" ? "active-feedback-button" : ""
            }`}
            onClick={() => handleFormSwitch("thanks")}
          >
            Благодарность
          </button>
          <button
            className={`feedback-form__button ${
              activeButton === "ask-a-question" ? "active-feedback-button" : ""
            }`}
            onClick={() => handleFormSwitch("ask-a-question")}
          >
            Задать вопрос
          </button>
          <button
            className={`feedback-form__button ${
              activeButton === "complaint" ? "active-feedback-button" : ""
            }`}
            onClick={() => handleFormSwitch("complaint")}
          >
            Жалоба
          </button>
        </div>
        <form className="feedback-form__form">
          <input
            className="feedback-form__input"
            placeholder="Фамилия, Имя, Отчество"
          />
          <input
            className="feedback-form__input"
            placeholder="Электронная почта"
          />
          <input className="feedback-form__input" placeholder="Телефон" />
          <textarea
            className="feedback-form__textarea"
            placeholder="Написать сообщение"
          />

          <div className="feedback-form__label-checkbox">
            <label>
              <input className="feedback-form__checkbox" type="checkbox" />
              <span className="feedback-form__custom-checkbox"></span>
            </label>
            <span>
              Я даю согласие на обработку
              <Link className="feedback-form__label-link" to="/privacy-policy">
                персональных данных
              </Link>
              ГБУЗ «ГКБ № 24»
            </span>
          </div>
          <Button onClick={onClose} size="big">
            Отправить
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
