import React, { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import { fetchDoctorById, fetchDoctors } from "../../../utils/api";
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
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const response = await fetchDoctors();

        if (Array.isArray(response.data)) {
          setDoctors(response.data);
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
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const doctorsToDisplay = Array.isArray(doctors) ? doctors.slice(0, 4) : [];

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

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
  }, [containerWidth, cardGap, cardTotalWidth, slidesToShow]);

  const extendedDoctors = useMemo(() => {
    return [
      ...doctors.slice(-slidesToShow),
      ...doctors,
      ...doctors.slice(0, slidesToShow),
    ];
  }, [doctors, slidesToShow]);

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
  }, [currentIndex, extendedDoctors.length, slidesToShow]);

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
              {extendedDoctors.map((doctor, index) => {
                const mainPhoto = doctor.photos?.[0];

                return (
                  <div key={index} className="doctors__card">
                    {mainPhoto ? (
                      <img
                        className="doctors__card-image"
                        src={mainPhoto}
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
                        {doctor.positions.join(", ")}
                      </p>
                    ) : (
                      <p className="doctor-preview-card__positions">
                        Должность не указана
                      </p>
                    )}

                    <Button
                      to={`/doctor/${doctor.id}`}
                      className="doctors__card-button"
                      type="button"
											color="secondary"
                    >
                      Подробнее
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorsMain;
