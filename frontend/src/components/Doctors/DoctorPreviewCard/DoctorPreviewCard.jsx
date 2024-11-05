import React from "react";
import { Link } from "react-router-dom";
import "./DoctorPreviewCard.css";
import Button from "../../Button/Button";

function DoctorPreviewCard({ doctor }) {
	console.log("Фотографии врача:", doctor.photos);

  return (
    <div className="doctor-preview-card">
      {doctor.photos ? (
        <img
          src={doctor.photos}
          alt={doctor.full_name}
          className="doctor-preview-card__photo"
        />
      ) : (
        <div className="doctor-preview-card__photo-placeholder">Фото нет</div>
      )}

      <h2 className="doctor-preview-card__name">{doctor.full_name}</h2>

      <Button to={`/doctor/${doctor.id}`} color="secondary">
        Подробнее
      </Button>
    </div>
  );
}

export default DoctorPreviewCard;
