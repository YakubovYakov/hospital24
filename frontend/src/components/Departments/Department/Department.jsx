import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDepartmentsById } from "../../../utils/api";
import { fetchDepartmentHead } from "../../../utils/api";
import { fetchDepartmentDoctors } from "../../../utils/api";

import "./Department.css";
import Button from "../../Button/Button";
import Feedback from "../../Feedback/Feedback";
import FeedbackMobile from "../../Feedback/FeedbackMobile/FeedbackMobile";
import FeedbackButtons from "../../Feedback/FeedbackButtons/FeedbackButtons";

function Department() {
  const { id: departmentId } = useParams();
  const [headDoctor, setHeadDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeButton, setActiveButton] = useState("doctors");

  useEffect(() => {
    fetchDepartmentHead(departmentId)
      .then((data) => setHeadDoctor(data))
      .catch((error) =>
        console.error("Ошибка при загрузке главного врача:", error)
      );
  }, [departmentId]);

  useEffect(() => {
    fetchDepartmentDoctors(departmentId)
      .then((data) => setDoctors(data))
      .catch((error) =>
        console.error("Ошибка при загрузке врачей отдела:", error)
      );
  }, [departmentId]);

  useEffect(() => {
    // Получаем данные отделения
    fetchDepartmentsById(departmentId)
      .then((data) => {
        setDepartment(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке данных отделения:", err);
        setError("Не удалось загрузить данные отделения.");
        setLoading(false);
      });
  }, [departmentId]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleMediaQueryChange = (e) => setIsMobileView(e.matches);

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery); 
    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleButtonClick = (buttonType) => setActiveButton(buttonType);

  if (!headDoctor) return <div>Загрузка...</div>;
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!department) return <div>Отделение не найдено</div>;

  return (
    <section className="department">
      <div className="department__content">
        <div className="department__wrapper">
          <div className="department__top">
            <h1 className="department__title">
              {department.name || "Название отделения"}
            </h1>
            <p className="department__location-table">Расположение отделения</p>
            <span className="department__detailed-location-table">
              {department.location || "Не указано"}
            </span>
          </div>
          <div className="department__container">
            <div className="department__text-container">
              <p className="department__location">Расположение отделения</p>
              <span className="department__detailed-location">
                {department.location || "Не указано"}
              </span>
              <div className="department__description">
                {department.descriptions &&
                department.descriptions.length > 0 ? (
                  department.descriptions.map((desc, index) => (
                    <p key={index} className="department__description-item">
                      {desc}
                    </p>
                  ))
                ) : (
                  <p>Описание отсутствует</p>
                )}
              </div>
            </div>
            <div className="department__head-doctor-card">
              <h2 className="department__head-doctor-card-title">
                Заведующий отделением
              </h2>
              <div className="department__head-doctor-card-img-wrapper">
                <img
                  className="department__head-doctor-card-image"
                  src={headDoctor.head_doctor_photo}
                  alt={headDoctor.head_doctor_title}
                />
              </div>
              <h3 className="department__head-doctor-card-name">
                {headDoctor.head_doctor_title}
              </h3>
              <p className="department__head-doctor-card-description">
                {headDoctor.head_doctor_positions?.join(", ")}
              </p>
              <Button to="/" color="primary">
                Записаться на прием
              </Button>
            </div>
          </div>
        </div>
        <div className="department__doctor-cards-container">
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
        </div>
        <div className="department__doctor_cards">
          {doctors.map((doctor, index) => (
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
                {doctor.doctor_card_description?.join(", ")}
              </p>
              <div className="department__button-container">
                <Button
                  to={`/doctor/${doctor.doctor_id}`}
                  color="secondary"
                  minWidth={true}
                >
                  Подробнее
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {isMobileView ? (
          <FeedbackMobile feedbacks={[]} />
        ) : (
          <Feedback feedbacks={[]} />
        )}
        <FeedbackButtons
          title="Оставить отзыв"
          description={`${department.name || ""} будет вам очень благодарно!`}
        />
      </div>
    </section>
  );
}

export default Department;
