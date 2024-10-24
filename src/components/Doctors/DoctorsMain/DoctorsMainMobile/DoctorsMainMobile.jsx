import React from "react";
import Button from "../../../Button/Button"; // Предполагается, что вы используете этот компонент
import "../DoctorsMain.css";

function DoctorsMainMobile({ doctors = [] }) {
  return (
    <section className="doctors-main">
      <div className="doctors-main__container">
        <div className="doctors-main__top">
          <div className="doctors-main__button-container">
            <h1 className="doctors-main__title">Наши врачи</h1>
            <Button to="/our-doctors" size="small">
              Все
            </Button>
          </div>
        </div>
        <div className="doctors-main__list">
          {doctors.map((doctor, index) => (
            <div key={index} className="doctors__card">
              <img
                className="doctors__card-image"
                src={doctor.main_photo}
                alt={`Фото ${doctor.full_name}`}
              />
              <h2 className="doctors__card-title">{doctor.full_name}</h2>
              <p className="doctors__card-position">
                {Array.isArray(doctor.position_main)
                  ? doctor.position_main.join(", ")
                  : doctor.position_main}
              </p>

              <Button
                to={`/doctor/${doctor.id}`}
                className="doctors__card-button"
                type="button"
              >
                Подробнее
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DoctorsMainMobile;
