import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchDepartmentsById,
  fetchDepartmentHead,
  fetchDepartmentDoctors,
} from "../../../utils/api";

import "./Department.css";
import Button from "../../Button/Button";
import Feedback from "../../Feedback/Feedback";
import FeedbackMobile from "../../Feedback/FeedbackMobile/FeedbackMobile";
import FeedbackButtons from "../../Feedback/FeedbackButtons/FeedbackButtons";
import DoctorAppointmentModal from "../../Doctors/DoctorAppointmentModal/DoctorAppointmentModal";

function Department() {
  const { id: departmentId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [headDoctor, setHeadDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
	const [nurses, setNurses] = useState([]);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeButton, setActiveButton] = useState("doctors");
  const [isMobileView, setIsMobileView] = useState(false);

  // Carousel logic
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  const cardGap = 24;
  const cardWidth = 264;
  const cardTotalWidth = cardWidth + cardGap;

  const slidesToShow = 4;

  const [currentIndex, setCurrentIndex] = useState(slidesToShow);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [departmentData, headDoctorData, doctorsData] = await Promise.all(
          [
            fetchDepartmentsById(departmentId),
            fetchDepartmentHead(departmentId),
            fetchDepartmentDoctors(departmentId),
          ]
        );

        if (isMounted) {
          setDepartment(departmentData);
          setHeadDoctor(headDoctorData);

          const filteredDoctors = headDoctorData
            ? doctorsData.filter(
                (doctor) => doctor.doctor_id !== headDoctorData.id
              )
            : doctorsData;

          setDoctors(filteredDoctors);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Ошибка при загрузке данных:", error);
          setError("Не удалось загрузить данные отделения.");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [departmentId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleMediaQueryChange = (e) => {
      setIsMobileView(e.matches);
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const handleButtonClick = (buttonType) => setActiveButton(buttonType);

  const extendedDoctors = useMemo(() => {
    if (doctors.length === 0) return [];
    return [
      ...doctors.slice(-slidesToShow),
      ...doctors,
      ...doctors.slice(0, slidesToShow),
    ];
  }, [doctors, slidesToShow]);

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.style.transform = `translateX(-${currentIndex * cardTotalWidth}px)`;
    }
  }, [currentIndex, cardTotalWidth]);

  const handleNextClick = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex >= extendedDoctors.length - slidesToShow) {
          const newIndex = slidesToShow;
          setCurrentIndex(newIndex);
          track.style.transform = `translateX(-${newIndex * cardTotalWidth}px)`;
        } else if (currentIndex <= slidesToShow - 1) {
          const newIndex = extendedDoctors.length - slidesToShow * 2;
          setCurrentIndex(newIndex);
          track.style.transform = `translateX(-${newIndex * cardTotalWidth}px)`;
        }
      };

      track.addEventListener("transitionend", handleTransitionEnd);

      return () => {
        track.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, [currentIndex, extendedDoctors.length, slidesToShow, cardTotalWidth]);

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
              {headDoctor ? (
                <>
                  <h2 className="department__head-doctor-card-title">
                    Заведующий отделением
                  </h2>
                  {headDoctor.head_doctor_photo ? (
                    <div className="department__head-doctor-card-img-wrapper">
                      <img
                        className="department__head-doctor-card-image"
                        src={headDoctor.head_doctor_photo}
                        alt={headDoctor.head_doctor_title || "Фото отсутствует"}
                      />
                    </div>
                  ) : (
                    <p className="no-photo-placeholder">Фото отсутствует</p>
                  )}
                  <h3 className="department__head-doctor-card-name">
                    {headDoctor.head_doctor_title || "Данные отсутствуют"}
                  </h3>
                  <p className="department__head-doctor-card-description">
                    {headDoctor.head_doctor_positions?.join(", ") ||
                      "Данные отсутствуют"}
                  </p>
                  <Button color="primary" onClick={openModal}>
                    Подробнее
                  </Button>
                  {isModalOpen && (
                    <DoctorAppointmentModal onClose={closeModal} />
                  )}
                </>
              ) : (
                <p>Информация о заведующем отделением временно недоступна</p>
              )}
            </div>
          </div>
        </div>

        <div className="department__carousel-container">
          <div className="department__carousel-header">
            <div className="department__doctor-cards-container">
              {(doctors && doctors.length > 0) ||
              (nurses && nurses.length > 0) ? (
                <div className="departments__select-wrapper">
                  <div className="departments__select">
                    {doctors && doctors.length > 0 && (
                      <button
                        className={`departments__select-button ${
                          activeButton === "doctors" ? "active_select" : ""
                        }`}
                        onClick={() => handleButtonClick("doctors")}
                      >
                        Врачи
                      </button>
                    )}
                    {nurses && nurses.length > 0 && (
                      <button
                        className={`departments__select-button ${
                          activeButton === "nurses" ? "active_select" : ""
                        }`}
                        onClick={() => handleButtonClick("nurses")}
                      >
                        Медсестры
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="department__carousel-buttons">
              {doctors.length > slidesToShow && (
                <>
                  <button
                    className="department__prev-button"
                    onClick={handlePrevClick}
                  />
                  <button
                    className="department__next-button"
                    onClick={handleNextClick}
                  />
                </>
              )}
            </div>
          </div>
          <div className="department__carousel" ref={carouselRef}>
            <div
              className="department__carousel-track"
              ref={trackRef}
              style={{
                transform: `translateX(-${currentIndex * cardTotalWidth}px)`,
                width: `${extendedDoctors.length * cardTotalWidth}px`,
              }}
            >
              {extendedDoctors.map((doctor, index) => {
                const originalIndex =
                  (index - slidesToShow + doctors.length) % doctors.length;
                const currentDoctor = doctors[originalIndex];

                if (!currentDoctor) {
                  console.warn(`currentDoctor is undefined at index ${index}`);
                  return null; // Или отобразить заглушку
                }

                return (
                  <div
                    key={`${currentDoctor.doctor_id}-${index}`}
                    className="department__doctor-card"
                  >
                    {currentDoctor.doctor_card_photo ? (
                      <img
                        className="department__doctor-card-image"
                        src={currentDoctor.doctor_card_photo}
                        alt={`Фото доктора ${currentDoctor.doctor_card_title}`}
                      />
                    ) : (
                      <div className="no-photo-placeholder">
                        Фото отсутствует
                      </div>
                    )}
                    <h3 className="department__doctor-card-title">
                      {currentDoctor.doctor_card_title || "Имя не указано"}
                    </h3>
                    <p className="department__doctor-card-description">
                      {currentDoctor.doctor_card_description?.join(", ") ||
                        "Описание отсутствует"}
                    </p>
                    <div className="department__button-container">
                      <Button
                        to={`/employers/${currentDoctor.doctor_id}`}
                        color="secondary"
                        minWidth={true}
                      >
                        Подробнее
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {isMobileView ? (
          <FeedbackMobile deptId={departmentId} />
        ) : (
          <Feedback deptId={departmentId} />
        )}
        <FeedbackButtons title="Оставить отзыв" />
      </div>
    </section>
  );
}

export default Department;
