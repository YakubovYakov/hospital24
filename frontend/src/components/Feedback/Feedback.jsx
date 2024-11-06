import React, { useState, useEffect, useRef, useMemo } from "react";
import "./Feedback.css";
import Button from "../Button/Button";

function Feedback({ feedbacks = [] }) {
  const [expanded, setExpanded] = useState([]);
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
		setExpanded(Array(feedbacks.length).fill(false));
	}, [feedbacks.length]); 

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
	}, [containerWidth]); 

	const extendedFeedbacks = useMemo(() => {
		return [
			...feedbacks.slice(-slidesToShow),
			...feedbacks,
			...feedbacks.slice(0, slidesToShow),
		];
	}, [feedbacks, slidesToShow]);

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
        if (currentIndex >= extendedFeedbacks.length - slidesToShow) {
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
          const newIndex = extendedFeedbacks.length - slidesToShow * 2;
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
  }, [
    currentIndex,
    
    slidesToShow,
    
    isMobile,
  ]);

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

  const toggleExpanded = (index) => {
    setExpanded((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <section className="feedback">
      <div className="feedback__container">
        <div className="feedback__top">
          <h1 className="feedback__title">Отзывы</h1>
          <div className="feedback__buttons-carousel-container">
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
        
        <div className="feedback__wrapper">
          <div className="feedback__carousel" ref={carouselRef}>
            <div
              className="feedback__track"
              ref={trackRef}
              style={{
                transform: isMobile
                  ? "none"
                  : `translateX(-${currentIndex * cardTotalWidth}px)`,
                width: isMobile
                  ? "auto"
                  : `${extendedFeedbacks.length * cardTotalWidth}px`,
              }}
            >
              {extendedFeedbacks.map((feedback, index) => {
                const originalIndex =
                  (index - slidesToShow + feedbacks.length) % feedbacks.length;
                return (
                  <div key={index} className="feedback__card">
                    <div className="feedback__card-icon">
                      <img
                        className="feedback__card-icon"
                        alt={`Иконка для ${feedback.title}`}
                        src={feedback.icon}
                      />
                      <h2 className="feedback__card-title">{feedback.title}</h2>
                    </div>
                    <p
                      className={`feedback__card-text ${
                        expanded[originalIndex] ? "expanded" : ""
                      }`}
                    >
                      {expanded[originalIndex]
                        ? feedback.fullText
                        : feedback.shortText}
                    </p>
                    <button
                      className="feedback__more_button"
                      onClick={() => toggleExpanded(originalIndex)}
                    >
                      {expanded[originalIndex] ? "Скрыть" : "Ещё"}
                    </button>
                    <p className="feedback__card-author">{feedback.author}</p>
                    <span className="feedback__card-date">{feedback.date}</span>
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

export default Feedback;
