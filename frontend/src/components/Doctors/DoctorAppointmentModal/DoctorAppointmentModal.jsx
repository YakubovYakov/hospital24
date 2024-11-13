import React, { useState } from "react";
import "./DoctorAppointmentModal.css";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";

function DoctorAppointmentModal({ onClose }) {
  const [activeForm, setActiveForm] = useState("online");

  const handleFormSwitch = (formType) => {
    setActiveForm(formType);
  };

  return (
    <div className="appointment-modal">
      <div className="appointment-modal__container">
        <button onClick={onClose} className="appointment-modal__close-button" />

        <div className="appointment-modal__text-content">
          <div>
            <h1 className="appointment-modal__title">
              Запись на прием к специалистам больницы
            </h1>
            <p className="appointment-modal__text">
						Уважаемые пациенты, вы можете выбрать удобный для вас способ записи к нашим специалистам либо через оператора контак-центра либо через форму обратной связи
            </p>
          </div>
          <div>
            <img
              className="appointment-modal__image"
              src={"http://24gkb.ru/images-svg/mobile.svg"}
              alt="Картинка телефона"
            />
          </div>
        </div>
        <div className="appointment-modal__buttons-container">
          <button
            className={`appointment-modal__button ${
              activeForm === "online" ? "active-modal" : ""
            }`}ч
            onClick={() => handleFormSwitch("online")}
          >
            Оставить заявку
          </button>
          <button
            className={`appointment-modal__button ${
              activeForm === "contact-center" ? "active-modal" : ""
            }`}
            onClick={() => handleFormSwitch("contact-center")}
          >
            Записаться через контакт-центр
          </button>
        </div>
        {activeForm === "online" && (
          <form className="appointment-modal__form">
            <input
              className="appointment-modal__input"
              placeholder="Фамилия, Имя, Отчество"
            />
            <input
              className="appointment-modal__input"
              placeholder="Электронная почта"
            />
            <input className="appointment-modal__input" placeholder="Телефон" />
            <textarea
              className="appointment-modal__textarea"
              placeholder="Написать сообщение"
            />

            <div className="appointment-modal__label-checkbox">
              <label>
                <input
                  className="appointment-modal__checkbox"
                  type="checkbox"
                />
                <span className="appointment-modal__custom-checkbox"></span>
              </label>
              <span>
                Я даю согласие на обработку
                <Link
                  className="appointment-modal__label-link"
                  to="/privacy-policy"
                >
                  персональных данных
                </Link>
                ГБУЗ «ГКБ № 24»
              </span>
            </div>
            <Button onClick={onClose} size="big">
              Отправить
            </Button>
          </form>
        )}
        {activeForm === "contact-center" && (
          <div className="appointment-modal__contacts">
            <div>
              <h2 className="appointment-modal__contacts-subtitle">Телефоны</h2>
              <div className="appointment-modal__contacts-phones">
                <p className="appointment-modal__contacts-paragraph">
                  +7 (495) 685-17-94
                </p>
                <p className="appointment-modal__contacts-paragraph">
                  +7 (495) 613-87-01
                </p>
              </div>
            </div>
            <div>
              <h2 className="appointment-modal__contacts-subtitle">
                Межокружное отделение рассеянного склероза
              </h2>
              <p className="appointment-modal__contacts-paragraph phone-paragraph">
                Телефон
              </p>
              <p className="appointment-modal__contacts-paragraph">
                +7 (495) 613-08-85
              </p>
            </div>
            <div>
              <h2 className="appointment-modal__contacts-subtitle">
                Часы работы
              </h2>
              <div className="appointment-modal__contacts-phones">
                <p className="appointment-modal__contacts-paragraph ">
                  с 08:00 до 20:00 — будни
                </p>
                <p className="appointment-modal__contacts-paragraph">
                  с 08:00 до 16:00 — в выходные
                </p>
              </div>
            </div>
            <div className="appointment-modal__contacts-ul">
              <p className="appointment-modal__contacts-paragraph list-paragraph">
                Записаться на прием в КДО
              </p>
              <p className="appointment-modal__contacts-paragraph list-paragraph">
                Узнать об оказании платных услугах
              </p>
              <p className="appointment-modal__contacts-paragraph list-paragraph">
                Узнать о состоянии близкого человека при госпитализации
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorAppointmentModal;
