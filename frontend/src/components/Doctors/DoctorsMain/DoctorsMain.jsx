import React, { useRef, useState, useEffect, useMemo } from "react";
import Button from "../../Button/Button";
import { fetchAllPaidServicesEmployers } from "../../../utils/api";
import "./DoctorsMain.css";

function DoctorsMain() {
  const [doctors, setDoctors] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  const cardGap = 24;
  const cardWidth = 270;
  const cardTotalWidth = cardWidth + cardGap;

  const [slidesToShow, setSlidesToShow] = useState(3);

  const [currentIndex, setCurrentIndex] = useState(slidesToShow);

	const prioritizedDoctorId = 70;

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const response = await fetchAllPaidServicesEmployers();

        if (Array.isArray(response)) {
          setDoctors(response);
        } else {
          console.error(
            "Ошибка: полученные данные о врачах не являются массивом",
            response
          );
          setDoctors([]);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных врачей:", error);
        setDoctors([]);
      }
    };

    loadDoctors();

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Устанавливаем начальное значение
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sortedDoctors = useMemo(() => {
    if (!doctors || doctors.length === 0) return [];

    const prioritizedDoctor = doctors.find(
      (doctor) => doctor.id === prioritizedDoctorId
    );
    const otherDoctors = doctors.filter(
      (doctor) => doctor.id !== prioritizedDoctorId
    );

    return prioritizedDoctor ? [prioritizedDoctor, ...otherDoctors] : doctors;
  }, [doctors, prioritizedDoctorId]);

  const extendedDoctors = useMemo(() => {
    if (isMobile || sortedDoctors.length === 0) return sortedDoctors;

    return [
      ...sortedDoctors.slice(-slidesToShow),
      ...sortedDoctors,
      ...sortedDoctors.slice(0, slidesToShow),
    ];
  }, [sortedDoctors, slidesToShow, isMobile]);

  useEffect(() => {
    if (isMobile) {
      setCurrentIndex(0);
    }
  }, [isMobile]);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (carouselRef.current) {
        setContainerWidth(carouselRef.current.offsetWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  useEffect(() => {
    const slides = Math.max(
      Math.floor((containerWidth + cardGap) / cardTotalWidth),
      1
    );
    if (slides !== slidesToShow) {
      setSlidesToShow(slides);
      setCurrentIndex(slides);
    }
  }, [containerWidth, cardGap, cardTotalWidth]);

  useEffect(() => {
    if (isMobile) return; 
    const track = trackRef.current;
    if (track) {
      if (isTransitioning) {
        track.classList.remove("no-transition");
      } else {
        track.classList.add("no-transition");
      }
      track.style.transform = `translateX(-${currentIndex * cardTotalWidth}px)`;
    }
  }, [currentIndex, isTransitioning, cardTotalWidth, isMobile]);

  useEffect(() => {
    if (isMobile) return; 
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
  }, [currentIndex, extendedDoctors.length, slidesToShow, isMobile]);

  const handleNextClick = () => {
    if (!isTransitioning && !isMobile) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (!isTransitioning && !isMobile) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <section className="doctors-main">
      <div className="doctors-main__container">
        <div className="doctors-main__top">
          <div className="doctors-main__top-container">
            <h1 className="doctors-main__title">Наши врачи</h1>
            <Button to="/our-doctors" size="small">
              Все
            </Button>
          </div>
          {!isMobile && (
            <div className="doctors-main__button-container">
              <button
                className="feedback__prev-button"
                onClick={handlePrevClick}
              />
              <button
                className="feedback__next-button"
                onClick={handleNextClick}
              />
            </div>
          )}
        </div>
        <div className="doctors-main__wrapper">
          <div className="doctors-main__carousel" ref={carouselRef}>
            <div
              className="doctors-main__track"
              ref={trackRef}
              style={{
                transform: isMobile
                  ? "none"
                  : `translateX(-${currentIndex * cardTotalWidth}px)`,
                width: isMobile
                  ? "auto"
                  : `${extendedDoctors.length * cardTotalWidth}px`,
              }}
            >
              {extendedDoctors.map((doctor, index) => (
                <div key={`${doctor.id}-${index}`} className="doctors__card">
                  {doctor.main_photo ? (
                    <img
                      className="doctors__card-image"
                      src={doctor.main_photo}
                      alt={`Фото ${doctor.full_name}`}
                    />
                  ) : (
                    <div className="doctors__card-image-placeholder">
                      Фото отсутствует
                    </div>
                  )}

                  <h2 className="doctors__card-title">{doctor.full_name}</h2>
                  {doctor.positions && doctor.positions.length > 0 ? (
                    <p className="doctor-preview-card__positions">
                      {doctor.main_position}
                    </p>
                  ) : (
                    <p className="doctor-preview-card__positions">
                      Должность не указана
                    </p>
                  )}

                  <Button
                    to={`/employers/${doctor.id}`}
                    className="doctors__card-button"
                    type="button"
                  >
                    Подробнее
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorsMain;
