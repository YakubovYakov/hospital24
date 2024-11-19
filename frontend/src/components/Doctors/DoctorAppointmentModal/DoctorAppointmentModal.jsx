const API_URL = import.meta.env.VITE_API_URL;

import React, { useState } from "react";
import "./DoctorAppointmentModal.css";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";

function DoctorAppointmentModal({ onClose, doctorName }) {
  const [activeForm, setActiveForm] = useState("online");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    doctor: doctorName || "",
  });
  const [consentGiven, setConsentGiven] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const handleFormSwitch = (formType) => {
    setActiveForm(formType);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setConsentGiven(e.target.checked);
  };

  const handleSubmit = async (e) => {
    if (!consentGiven) {
      alert("Пожалуйста, дайте согласие на обработку персональных данных.");
      return;
    }

    try {
      console.log("Отправка данных формы:", formData);

      const response = await fetch(`${API_URL}/feedbacks/send-feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, type: "appointment" }),
      });

      if (response.ok) {
        setFormStatus("success");
        alert("Запись успешно отправлена!");
        onClose();
      } else {
        setFormStatus("error");
        alert("Ошибка при отправке записи. Пожалуйста, попробуйте еще раз.");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      setFormStatus("error");
      alert("Ошибка при отправке записи. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <div className="appointment-modal">
      <div className="appointment-modal__container">
        <div className="appointment-modal__text-content">
          <div className="appointment-modal__title-container">
            <h1 className="appointment-modal__title">
              Запись на прием к специалистам больницы
            </h1>
            <button
              onClick={onClose}
              className="appointment-modal__close-button"
            />
          </div>
          <p className="appointment-modal__text">
            Уважаемые пациенты, вы можете выбрать удобный для вас способ записи
            к нашим специалистам либо через оператора контак-центра либо через
            форму обратной связи
          </p>
        </div>
        <div className="appointment-modal__buttons-container">
          <button
            className={`appointment-modal__button ${
              activeForm === "online" ? "active-modal" : ""
            }`}
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
          <form className="appointment-modal__form" onSubmit={handleSubmit}>
            <input
              className="appointment-modal__input"
              name="name"
              placeholder="Фамилия, Имя, Отчество"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              className="appointment-modal__input"
              name="email"
              type="email"
              placeholder="Электронная почта"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              className="appointment-modal__input"
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <textarea
              className="appointment-modal__textarea"
              name="message"
              placeholder="Написать сообщение"
              value={formData.message}
              onChange={handleInputChange}
            />

            <div className="appointment-modal__label-checkbox">
              <label>
                <input
                  className="appointment-modal__checkbox"
                  type="checkbox"
                  checked={consentGiven}
                  onChange={handleCheckboxChange}
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
            <Button type="submit" size="big">
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
