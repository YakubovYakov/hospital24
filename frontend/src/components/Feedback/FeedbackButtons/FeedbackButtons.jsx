import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../Button/Button";
import FeedbackForm from "../FeedbackForm/FeedbackForm";

function FeedbackButtons({ title, description }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isHomePage = location.pathname === "/";

  return (
    <div className="feedback__buttons-container">
      <h2 className="feedback__buttons-title">{title}</h2>
      {description && <p className="feedback__buttons-text">{description}</p>}
      <div className="feedback__buttons-bar">
        {isHomePage ? (
          <Button onClick={openModal}>Написать здесь</Button>
        ) : (
          <>
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
            <Button onClick={openModal}>Написать здесь</Button>
          </>
        )}
        {isModalOpen && <FeedbackForm onClose={closeModal} />}
      </div>
    </div>
  );
}

export default FeedbackButtons;
