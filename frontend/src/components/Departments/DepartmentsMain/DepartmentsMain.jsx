import React, { useEffect, useMemo, useRef, useState } from "react";
import { fetchDepartments } from "../../../utils/api";
import "./DepartmentsMain.css";
import Button from "../../Button/Button";
import dept_image from "../../../images2/svg/dept_image.png";

function DepartmentsMain() {
  const [departments, setDepartments] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  const cardGap = 48;
  const cardWidth = 352;
  const cardTotalWidth = cardWidth + cardGap;

  const [slidesToShow, setSlidesToShow] = useState(3);

  const [currentIndex, setCurrentIndex] = useState(slidesToShow);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await fetchDepartments();
        const allowedIds = [27, 28, 12, 47, 13, 3, 32];
        const filteredDepartments = data.filter((department) => {
          return allowedIds.includes(department.id);
        });
        const sortedDepartments = filteredDepartments.sort((a, b) => {
          return allowedIds.indexOf(a.id) - allowedIds.indexOf(b.id);
        });
        setDepartments(sortedDepartments);
      } catch (error) {
        console.error("Ошибка при загрузке отделений:", error);
      }
    };
    loadDepartments();
  }, []);

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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 580);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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

  const extendedDepartments = useMemo(() => {
    if (isMobile || departments.length === 0) return departments;
    return [
      ...departments.slice(-slidesToShow),
      ...departments,
      ...departments.slice(0, slidesToShow),
    ];
  }, [departments, slidesToShow]);

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
        if (currentIndex >= extendedDepartments.length - slidesToShow) {
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
          const newIndex = extendedDepartments.length - slidesToShow * 2;
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
  }, [currentIndex, extendedDepartments.length, slidesToShow]);

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
    <section className="departments-main">
      <div className="departments-main__container">
        <div className="departments-main__top">
          <div className="departments-main__button-container">
            <h1 className="departments-main__title">Наши отделения</h1>
            <Button to="/departments" size="small">
              Все
            </Button>
          </div>
          <div className="departments-main__button-container">
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
        <div className="departments-main__wrapper">
          <div className="departments-main__carousel" ref={carouselRef}>
            <div
              className="departments-main__track"
              ref={trackRef}
              style={{
                transform: isMobile
                  ? "none"
                  : `translateX(-${currentIndex * cardTotalWidth}px)`,
                width: isMobile
                  ? "auto"
                  : `${extendedDepartments.length * cardTotalWidth}px`,
              }}
            >
              {extendedDepartments.map((department, index) => {
                const originalIndex =
                  (index - slidesToShow + departments.length) %
                  departments.length;
                const currentDepartment = departments[originalIndex];

                return (
                  <div key={index} className="departments-main__card">
                    <h2 className="departments-main__card-title">
                      {currentDepartment.name}
                    </h2>
                    <p className="departments-main__card-text"></p>
                    <div className="departments-main__card-button_container">
                      <img
                        className="departments-main__card-image"
                        src={currentDepartment.photo_url} // Используем currentDepartment.photo_url
                        alt={`Фото отделения ${currentDepartment.name}`}
                      />
                      <Button
                        to={`/departments/${currentDepartment.id}`}
                        color="secondary"
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
      </div>
    </section>
  );
}

export default DepartmentsMain;
