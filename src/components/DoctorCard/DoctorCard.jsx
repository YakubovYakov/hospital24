import React from "react";
import "./DoctorCard.css";
import PhotoSlider from "../../components/PhotoSlider/PhotoSlider";

function DoctorCard({
  full_name,
  position,
  description,
  experience,
  education,
  year,
  professional_experience,
  photos,
}) {
  return (
    <section className="doctor-card">
      <div className="doctor-card__container">
        <PhotoSlider photos={photos} />
        <div className="doctor-card__information">
          <h1 className="doctor-card__full-name">{full_name}</h1>
          <ul className="doctor-card__positions">
            {position.map((pos, index) => (
              <li key={index} className="doctor-card__position">
                {pos}
              </li>
            ))}
          </ul>

          <p className="doctor-card__description">
            {description.map((part, index) => (
              <span key={index} style={{ color: part.color }}>
                {part.text}
              </span>
            ))}
          </p>
          <p className="doctor-card__experience">
            Стаж работы:
            <span className="doctor-card__experience-number">{experience}</span>
          </p>
          <button className="doctor-card__button">Записаться на прием</button>
          <div className="doctor-card__details-wrapper">
            <details className="doctor-card__details">
              <summary className="doctor-card__details-title">
                Образование
                <span className="doctor-card__details-marker"></span>
              </summary>

              {education.map((edu, index) => (
                <p key={index} className="doctor-card__details-text">
                  <span className="doctor-card__details-year">{edu.year}</span>
                  {edu.text}
                </p>
              ))}
            </details>

            <details className="doctor-card__details">
              <summary className="doctor-card__details-title">
                Профессиональный опыт
                <span className="doctor-card__details-marker"></span>
              </summary>
              {professional_experience.map((prof, index) => (
                <p key={index} className="doctor-card__details-text">
                  <span className="doctor-card__details-year">{prof.date}</span>
                  {prof.text}
                </p>
              ))}
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorCard;
