import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { departments } from "../../../data/departmentsData";
import "./Department.css";
import { doctors } from "../../../data/doctorsData";
import DynamicRoute from "../../DynamicRoute/DynamicRoute";
import Feedback from "../../Feedback/Feedback";
import { departmentFeedbacks } from "../../../feedbacks/departmentReviews";

import Button from "../../Button/Button";
import FeedbackButtons from "../../Feedback/FeedbackButtons/FeedbackButtons";

function Department() {
  const [activeButton, setActiveButton] = useState("doctors");

  const { id } = useParams();
	const departmentId = parseInt(id, 10);

  const department = departments.find((dept) => dept.id === departmentId);


	const currentDepartmentFeedbacks = departmentFeedbacks.filter(
		(fb) => fb.depId === departmentId
	);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  if (!department) {
    return <div>Отделение не найдено</div>;
  }
  return (
    <section className="department">
      <div className="department__wrapper">
        <div className="department__top">
          <h1 className="department__title">{department.title}</h1>
        </div>
        <div className="department__container">
          <div className="department__text-container">
            <p className="department__location">Расположение отделения</p>
            <span className="department__detailed-location">
              {department.location}
            </span>
            <div className="department__description">
              {department.description.map((item, index) => (
                <p key={index} className="department__description-item">
                  {item.text}
                </p>
              ))}
            </div>
          </div>
          <div className="department__head-doctor-card">
            <h2 className="department__head-doctor-card-title">
              Заведующий отделением
            </h2>
            <div className="department__head-doctor-card-img-wrapper">
              <img
                className="department__head-doctor-card-image"
                src={department.head_doctor_photo}
                alt={department.head_doctor_title}
              />
            </div>
            <h3 className="department__head-doctor-card-name">
              {department.head_doctor_title}
            </h3>
            <p className="department__head-doctor-card-description">
              {department.head_doctor_description}
            </p>
            <Button to="/" color="primary">
              Записаться на прием
            </Button>
          </div>
        </div>
      </div>
      <div className="departments__select-wrapper">
        <div className="departments__select">
          <button
            className={`departments__select-button ${
              activeButton === "doctors" ? "active_select" : ""
            }`}
            onClick={() => handleButtonClick("doctors")}
          >
            Врачи
          </button>
          <button
            className={`departments__select-button ${
              activeButton === "nurses" ? "active_select" : ""
            }`}
            onClick={() => handleButtonClick("nurses")}
          >
            Медсестры
          </button>
        </div>
      </div>
      <div className="department__doctor_cards">
        {department.doctor_card.map((doctor, index) => (
          <div key={index} className="department__doctor-card">
            <div className="department__doctor-card-img-wrapper">
              <img
                className="department__doctor-card-image"
                src={doctor.doctor_card_photo}
                alt={`Фото доктора ${doctor.doctor_card_title}`}
              />
            </div>
            <h3 className="department__doctor-card-title">
              {doctor.doctor_card_title}
            </h3>
            <p className="department__doctor-card-description">
              {doctor.doctor_card_description}
            </p>
            <div className="department__button-container">
              <Button to="/" color="secondary" minWidth={true}>
                Подробнее
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Feedback feedbacks={currentDepartmentFeedbacks} />
			<FeedbackButtons 
				title="Оставить отзыв"
				description={`${department ? department.title : ''} будет вам очень благодарна!`} 
				/>
    </section>
  );
}

export default Department;
