import React from "react";
import { Link } from "react-router-dom";
import "./DoctorPreviewCard.css";
import Button from "../../Button/Button";

function DoctorPreviewCard({ doctor }) {
  return (
    <div className="doctor-preview-card">
      {doctor.photos && doctor.photos.length > 0 ? (
        <img
          src={doctor.photos[0]}
          alt={doctor.full_name}
          className="doctor-preview-card__photo"
        />
      ) : (
        <div className="doctor-preview-card__photo-placeholder">Фото нет</div>
      )}

      <h2 className="doctor-preview-card__name">{doctor.full_name}</h2>

      {doctor.main_post ? (
        <p className="doctor-preview-card__positions">
          {doctor.main_post}
        </p>
      ) : (
        <p className="doctor-preview-card__positions">Должность не указана</p>
      )}

      <Button to={`/doctor/${doctor.id}`} color="secondary">
        Подробнее
      </Button>
    </div>
  );
}

export default DoctorPreviewCard;
