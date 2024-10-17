import React from "react";
import { Link } from "react-router-dom";
import "./DoctorsMain.css";

function DoctorsMain({ doctors }) {
  const doctorsToDisplay = doctors.slice(0, 4);

  return (
    <section className="doctors-main">
      <div className="services__top">
        <h1 className="services__title">Наши врачи</h1>
        <button className="services__button">Посмотреть всех</button>
      </div>

      <div className="doctors__cards-container">
      <button className="feedback__prev-button" />
        {doctorsToDisplay.map((doctor) => (
          <div key={doctor.id} className="doctors__card">
            <img
              className="doctors__card-image"
              src={doctor.main_photo}
              alt={`Фото ${doctor.full_name}`}
            />
            <h2 className="doctors__card-title">{doctor.full_name}</h2>
            <p className="doctors__card-position">
              {Array.isArray(doctor.position)
                ? doctor.position_main.join(", ")
                : doctor.position_main}
            </p>

            <Link to={`/doctor/${doctor.id}`} className="doctors__card-button" type="button">
              Подробнее
            </Link>
          </div>
        ))}
      <button className="feedback__next-button" />
      </div>
    </section>
  );
}

export default DoctorsMain;
