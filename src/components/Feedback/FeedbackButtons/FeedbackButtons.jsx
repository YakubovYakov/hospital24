import React from "react";
import Button from "../../Button/Button";

function FeedbackButtons({ title, description }) {
  return (
    <div className="feedback__buttons-container">
      <h2 className="feedback__buttons-title">{title}</h2>
      {description && <p className="feedback__buttons-text">{description}</p>}
      <div className="feedback__buttons-bar">
        <Button color="secondary">Яндекс.Карты</Button>
        <Button color="secondary">Про Докторов</Button>
        <Button>Написать здесь</Button>
      </div>
    </div>
  );
}

export default FeedbackButtons;