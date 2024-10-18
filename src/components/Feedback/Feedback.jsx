import React, { useState, useEffect, useRef } from "react";
import "./Feedback.css";
import icon1 from "../../images/icon-feedback/icon1.png";
import icon2 from "../../images/icon-feedback/icon2.png";
import icon3 from "../../images/icon-feedback/icon3.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Feedback() {
  const feedbacks = [
    {
      title: "Яндекс Карты",
      shortText:
        "Выражаю огромную благодарность Сергею Александровичу за быструю помощь в продолжении лечения моей мамы Барановой Нины Петровны. 6 мая моей мамe...",
      fullText:
        "Выражаю огромную благодарность Сергею Александровичу за быструю помощь в продолжении лечения моей мамы Барановой Нины Петровны. 6 мая моей маме Нине Фаиновне",
      author: "Нина Фаиновна",
      date: "12.10.2023",
      icon: icon1,
    },
    {
      title: "Сайт gkb-24.ru",
      shortText:
        "Большеое спасибо Сергею Александровичу за заботу и внимание. Врачи спасли мне жизнь после трагедии в Крокусе. И Артём Анатольевич , каждый день...",
      fullText:
        "Большеое спасибо Сергею Александровичу за заботу и внимание. Врачи спасли мне жизнь после трагедии в Крокусе. И Артём Анатольевич , каждый день...",
      author: "Данила Олегович",
      date: "02.03.2021",
      icon: icon2,
    },
    {
      title: "ПроДокторов",
      shortText:
        "Выражаю огромную благодарность Сергею Александровичу за быструю помощь в продолжении лечения моей мамы Барановой Нины Петровны.",
      fullText:
        "Выражаю огромную благодарность Сергею Александровичу за быструю помощь в продолжении лечения моей мамы Барановой Нины Петровны. 6 мая моей маме...",
      author: "Елизавета Евгеньевна",
      date: "01.04.2020",
      icon: icon3,
    },
    {
      title: "Яндекс 4",
      shortText:
        "Выражаю огромную благодарность Сергею Александровичу за быструю помощь в продолжении лечения...",
      fullText:
        "Выражаю огромную благодарность Сергею Александровичу за быструю помощь в продолжении лечения моей мамы Барановой Нины Петровны. 6 мая моей маме...",
      author: "Нина Фаиновна",
      date: "12.10.2023",
      icon: icon2,
    },
    {
      title: "Яндекс 5",
      shortText:
        "Выражаю огромную благодарность Сергею Александровичу за быструю помощь в продолжении лечения...",
      fullText:
        "Выражаю огромную благодарность Сергею Александровичу за быструю помощь в продолжении лечения моей мамы Барановой Нины Петровны. 6 мая моей маме...",
      author: "Нина Фаиновна",
      date: "12.10.2023",
      icon: icon3,
    },
    {
      title: "Яндекс 6",
      shortText:
        "Выражаю огромную благодарность Сергею Александровичу за быструю помощь в продолжении лечения...",
      fullText:
        "Выражаю огромную благодарность Сергею Александровичу за быструю помощь в продолжении лечения моей мамы Барановой Нины Петровны. 6 мая моей маме...",
      author: "Нина Фаиновна",
      date: "12.10.2023",
      icon: icon1,
    },
  ];

  const [expanded, setExpanded] = useState(Array(feedbacks.length).fill(false));
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
    setSlidesToShow(slides);
    setCurrentIndex(slides);
  }, [containerWidth, cardGap, cardTotalWidth]);

  const extendedFeedbacks = [
    ...feedbacks.slice(-slidesToShow),
    ...feedbacks,
    ...feedbacks.slice(0, slidesToShow),
  ];

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
    extendedFeedbacks.length,
    slidesToShow,
    cardTotalWidth,
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
					<button className="feedback__prev-button" onClick={handlePrevClick} />
					<button className="feedback__next-button" onClick={handleNextClick} />
					</div>
        </div>
        <div className="feedback__table_button-container">
          <button
            className="feedback__prev_table-button"
            onClick={handlePrevClick}
          />
          <button
            className="feedback__next_table-button"
            onClick={handleNextClick}
          />
        </div>
          {/* <button className="feedback__prev-button" onClick={handlePrevClick} /> */}
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
          {/* <button className="feedback__next-button" onClick={handleNextClick} /> */}
        <div className="feedback__buttons-container">
          <h2 className="feedback__buttons-title">Оставить отзыв</h2>
          <p className="feedback__buttons-text">
            Cергей Александрович будет вам очень благодарен!
          </p>
          <div className="feedback__buttons-bar">
            <button className="feedback__button">Яндекс.Карты</button>
            <button className="feedback__button">Про Докторов</button>
            <button className="feedback__button active">Написать здесь</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feedback;
