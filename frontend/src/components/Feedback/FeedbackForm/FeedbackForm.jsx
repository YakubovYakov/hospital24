const API_URL = import.meta.env.VITE_API_URL;


import React, { useState } from "react";
import "./FeedbackForm.css";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import logo from "../../../images2/Logotype.png";

function FeedbackForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    type: "feedback",
  });
  const [consentGiven, setConsentGiven] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setConsentGiven(e.target.checked);
  };

  const handleSubmit = async (e) => {
		e.preventDefault();
	
		if (!consentGiven) {
			alert("Пожалуйста, дайте согласие на обработку персональных данных.");
			return;
		}
	
		try {
			console.log("Отправка данных формы:", formData)
	
			const response = await fetch(`${API_URL}/feedbacks/send-feedback`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
	
			if (response.ok) {
				console.log("Ответ от сервера:", await response.json());
				setFormStatus("success");
				alert("Ваше сообщение успешно отправлено!");
				onClose();
			} else {
				console.error("Ошибка от сервера:", response.statusText); 
				setFormStatus("error");
				alert("Ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.");
			}
		} catch (error) {
			console.error("Произошла ошибка при отправке сообщения:", error);
			setFormStatus("error");
			alert(
				"Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз."
			);
		}
	};

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
        <form className="feedback-form__form" onSubmit={handleSubmit}>
          <input
            className="feedback-form__input"
            name="name"
            placeholder="Фамилия, Имя, Отчество"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            className="feedback-form__input"
            name="email"
            type="email"
            placeholder="Электронная почта"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            className="feedback-form__input"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <textarea
            className="feedback-form__textarea"
            name="message"
            placeholder="Написать сообщение"
            value={formData.message}
            onChange={handleInputChange}
            required
          />

          <div className="feedback-form__label-checkbox">
            <label>
              <input
                className="feedback-form__checkbox"
                type="checkbox"
                checked={consentGiven}
								onChange={handleCheckboxChange}
              />
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
          <Button type="submit" size="big">
            Отправить
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
