import React, { useState } from "react";
import "./FAQ.css"; 

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDetails = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqData = [
    {
      question: "В каком отделении находится пациент?",
      answer: "Здесь находится ответ на первый вопрос.",
    },
    {
      question: "Пускают ли на территорию личный транспорт/такси?",
      answer: "Ответ на второй вопрос.",
    },
    {
      question: "Время посещения пациентов?",
      answer: "Ответ на третий вопрос.",
    },
    {
      question: "Можно ли пройти лечение без направления?",
      answer: "Ответ на четвертый вопрос.",
    },
    {
      question: "С какими заболеваниями можно пройти лечение?",
      answer: "Ответ на пятый вопрос.",
    },
    {
      question: "Время работы ГБУЗ «ГКБ № 24»?",
      answer: "Ответ на шестой вопрос.",
    },
  ];

  return (
    <section className="faq">
      <div className="faq__container">
        <h1 className="faq__title">Часто задаваемые вопросы</h1>

        <div className="faq__details-container">
          {faqData.map((item, index) => (
            <div key={index} className="faq__details">
              <div
                className="faq__details-title"
                onClick={() => toggleDetails(index)}
              >
                {item.question}
                <span
                  className={`faq__details-marker ${
                    openIndex === index ? "open" : ""
                  }`}
                ></span>
              </div>
              {openIndex === index && (
                <p className="faq__details-text">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
        <div className="faq__modal">
          <h2 className="faq__subtitle">Остались еще вопросы?</h2>
          <div className="faq__buttons__container">
            <button className="faq__button">Перезвоните мне</button>
            <button className="faq__button white-btn">Написать</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
