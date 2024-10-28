import React from "react";
import Button from "../../Button/Button";

function FeedbackButtons({ title, description }) {
  return (
    <div className="feedback__buttons-container">
      <h2 className="feedback__buttons-title">{title}</h2>
      {description && <p className="feedback__buttons-text">{description}</p>}
      <div className="feedback__buttons-bar">
        <Button
          to="https://yandex.ru/maps/org/gorodskaya_klinicheskaya_bolnitsa_24/1022361531/reviews/?ll=37.578785%2C55.798814&z=14"
          color="secondary"
        >
          Яндекс.Карты
        </Button>
        <Button
          to="https://prodoctorov.ru/moskva/lpu/21011-gorodskaya-klinicheskaya-bolnica-24"
          color="secondary"
        >
          Про Докторов
        </Button>
        <Button>Написать здесь</Button>
      </div>
    </div>
  );
}

export default FeedbackButtons;
