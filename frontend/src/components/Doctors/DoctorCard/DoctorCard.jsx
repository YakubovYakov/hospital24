import React, { useState } from "react";
import "./DoctorCard.css";
import PhotoSlider from "../../../components/PhotoSlider/PhotoSlider";
import Button from "../../Button/Button";
import DoctorAppointmentModal from "../DoctorAppointmentModal/DoctorAppointmentModal";

function DoctorCard({
  full_name,
  position,
  description,
  experience,
  education,
  professional_experience,
  photos,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const yearsOfExperience =
    new Date().getFullYear() - new Date(experience).getFullYear();

		console.log("Описание:", description);

  return (
    <section className="doctor-card">
      <div className="doctor-card__container">
        <PhotoSlider photos={photos} />
        <div className="doctor-card__information">
          <h1 className="doctor-card__full-name">{full_name}</h1>
          <ul className="doctor-card__positions">
            {position &&
              position.map((pos, index) => (
                <li key={index} className="doctor-card__position">
                  {pos}
                </li>
              ))}
          </ul>
          <p className="doctor-card__description">{description}</p>
          <p className="doctor-card__experience">
            Стаж работы:
            <span className="doctor-card__experience-number">
              {yearsOfExperience} лет
            </span>
          </p>
          <Button size="big" onClick={openModal}>
            Записаться на прием
          </Button>
          {isModalOpen && <DoctorAppointmentModal onClose={closeModal} />}
          <div className="doctor-card__details-wrapper">
            {/* Образование */}
            <details className="doctor-card__details">
              <summary className="doctor-card__details-title">
                Образование
                <span className="doctor-card__details-marker"></span>
              </summary>
              {education && education.length > 0 ? (
                education.map((edu, index) => (
                  <p key={index} className="doctor-card__details-text">
                    <span className="doctor-card__details-year">
                      {edu.year}
                    </span>
                    {edu.text}
                  </p>
                ))
              ) : (
                <p>Информация об образовании отсутствует</p>
              )}
            </details>

            {/* Профессиональный опыт */}
            <details className="doctor-card__details">
              <summary className="doctor-card__details-title">
                Профессиональный опыт
                <span className="doctor-card__details-marker"></span>
              </summary>
              {professional_experience && professional_experience.length > 0 ? (
                professional_experience.map((exp, index) => (
                  <p key={index} className="doctor-card__details-text">
                    <span className="doctor-card__details-year">
                      {exp.date}
                    </span>
                    {exp.text}
                  </p>
                ))
              ) : (
                <p>Информация о профессиональном опыте отсутствует</p>
              )}
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorCard;
