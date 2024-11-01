import React, { useState } from "react";
import "../Feedback.css";

function FeedbackMobile({ feedbacks = [] }) {
  const [expanded, setExpanded] = useState([]);

  const toggleExpanded = (index) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };
  return (
    <section className="feedback-mobile">
      <div className="feedback__container">
        <div className="feedback__top">
          <h1 className="feedback__title">Отзывы</h1>
        </div>
				<div className="feedback__mobile-card-container">
        {feedbacks.map((feedback, index) => (
          <div className="feedback__card" key={feedback.id || index}>
            <div className="feedback__card-icon">
              <img
                className="feedback__card-icon"
                alt={`Иконка для ${feedback.title}`}
                src={feedback.icon}
              />
              <h2 className="feedback__card-title">{feedback.title}</h2>
            </div>
            <p
              className={`feedback__card-text ${
                expanded[index] ? "expanded" : ""
              }`}
            >
              {expanded[index] ? feedback.fullText : feedback.shortText}
            </p>
            <button
              className="feedback__more_button"
              onClick={() => toggleExpanded(index)}
            >
              {expanded[index] ? "Скрыть" : "Еще"}
            </button>
            <p className="feedback__card-author">{feedback.author}</p>
            <span className="feedback__card-date">{feedback.date}</span>
          </div>
        ))}
				</div>
      </div>
    </section>
  );
}

export default FeedbackMobile