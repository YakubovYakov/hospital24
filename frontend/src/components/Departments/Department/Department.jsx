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

function Department() {
  const { id: departmentId } = useParams();
  const [headDoctor, setHeadDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeButton, setActiveButton] = useState("doctors");

  // Логика карусели
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  const cardGap = 24;
  const cardWidth = 264;
  const cardTotalWidth = cardWidth + cardGap;

  const slidesToShow = 4;

  const [currentIndex, setCurrentIndex] = useState(slidesToShow);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const extendedDoctors = useMemo(() => {
    if (doctors.length === 0) return [];
    return [
      ...doctors.slice(-slidesToShow),
      ...doctors,
      ...doctors.slice(0, slidesToShow),
    ];
  }, [doctors]);

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      if (isTransitioning) {
        track.classList.remove("no-transition");
      } else {
        track.classList.add("no-transition");
      }
      track.style.transform = `translateX(-${currentIndex * cardTotalWidth}px)`;
    }
  }, [currentIndex, isTransitioning, cardTotalWidth]);

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      const handleTransitionEnd = () => {
        if (currentIndex >= extendedDoctors.length - slidesToShow) {
          track.classList.add("no-transition");
          const newIndex = slidesToShow;
          setCurrentIndex(newIndex);
          track.style.transform = `translateX(-${newIndex * cardTotalWidth}px)`;

          requestAnimationFrame(() => {
            track.classList.remove("no-transition");
            setIsTransitioning(false);
          });
        } else if (currentIndex <= slidesToShow - 1) {
          track.classList.add("no-transition");
          const newIndex = extendedDoctors.length - slidesToShow * 2;
          setCurrentIndex(newIndex);
          track.style.transform = `translateX(-${newIndex * cardTotalWidth}px)`;

          requestAnimationFrame(() => {
            track.classList.remove("no-transition");
            setIsTransitioning(false);
          });
        } else {
          setIsTransitioning(false);
        }
      };

      track.addEventListener("transitionend", handleTransitionEnd);

      return () => {
        track.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, [currentIndex, extendedDoctors.length, slidesToShow, cardTotalWidth]);

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

  // Получение данных о врачах и отделении
  useEffect(() => {
    let isMounted = true;

    const fetchHeadDoctorData = async () => {
      try {
        const data = await fetchDepartmentHead(departmentId);
        if (isMounted) {
          setHeadDoctor(data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Ошибка при загрузке главного врача:", error);
        }
      }
    };

    fetchHeadDoctorData();

    return () => {
      isMounted = false;
    };
  }, [departmentId]);

  useEffect(() => {
    fetchDepartmentDoctors(departmentId)
      .then((data) => setDoctors(data))
      .catch((error) =>
        console.error("Ошибка при загрузке врачей отдела:", error)
      );
  }, [departmentId]);

  useEffect(() => {
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
    window.scrollTo(0, 0);
  }, []);

  const handleButtonClick = (buttonType) => setActiveButton(buttonType);

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
                  <Button to="/" color="primary">
                    Записаться на прием
                  </Button>
                </>
              ) : (
                <p>Информация о заведующем отделением временно недоступна</p>
              )}
            </div>
          </div>
        </div>

        {doctors.length > 0 && (
          <div className="department__carousel-container">
            <div className="department__carousel-header">
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
              <div className="department__carousel-buttons">
                <button
                  className="department__prev-button"
                  onClick={handlePrevClick}
                />
                <button
                  className="department__next-button"
                  onClick={handleNextClick}
                />
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
                  return (
                    <div key={index} className="department__doctor-card">
                      <div className="department__doctor-card-img-wrapper">
                        <img
                          className="department__doctor-card-image"
                          src={
                            doctors[originalIndex].doctor_card_photo ||
                            doctor.doctor_card_photo
                          }
                          alt={`Фото доктора ${doctors[originalIndex].doctor_card_title}`}
                        />
                      </div>
                      <h3 className="department__doctor-card-title">
                        {doctors[originalIndex].doctor_card_title}
                      </h3>
                      <p className="department__doctor-card-description">
                        {doctors[originalIndex].doctor_card_description?.join(
                          ", "
                        )}
                      </p>
                      <div className="department__button-container">
                        <Button
                          to={`/doctor/${doctors[originalIndex].doctor_id}`}
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
        )}
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
      </div>
    </section>
  );
}

export default Department;
