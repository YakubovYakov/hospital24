import React, { useState, useEffect, useRef } from "react";
import "./Feedback.css";
import icon1 from "../../images/icon-feedback/icon1.png";
import icon2 from "../../images/icon-feedback/icon2.png";
import icon3 from "../../images/icon-feedback/icon3.png";


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

	const [currentSlide, setCurrentSlide] = useState(0);
	const [expanded, setExpanded] = useState(Array(feedbacks.length).fill(false));
	const [containerWidth, setContainerWidth] = useState(0);
	
	const cardGap = 24; // Отступ между карточками
	const cardWidth = 330; // Ширина карточки
	const cardTotalWidth = cardWidth + cardGap; // Общая ширина карточки с отступом
	const [isMobile, setIsMobile] = useState(false);
	
	const carouselRef = useRef(null);
	
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
	
		handleResize(); // Для первоначальной загрузки
		window.addEventListener("resize", handleResize);
	
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	
	// Вычисляем, сколько карточек может быть отображено одновременно
	const slidesToShow = Math.max(Math.floor((containerWidth + cardGap) / cardTotalWidth), 1);
	
	// Ширина трека в зависимости от количества карточек
	const trackWidth = feedbacks.length * cardTotalWidth;
	const maxSlideIndex = Math.max(feedbacks.length - slidesToShow, 0);
	
	// Обновляем currentSlide, если slidesToShow меняется и currentSlide выходит за пределы
	useEffect(() => {
		if (currentSlide > maxSlideIndex) {
			setCurrentSlide(maxSlideIndex);
		}
	}, [currentSlide, maxSlideIndex]);
	
	const handleNextClick = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide < maxSlideIndex ? prevSlide + 1 : 0
		);
	};
	
	const handlePrevClick = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide > 0 ? prevSlide - 1 : maxSlideIndex
		);
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
			<h1 className="feedback__title">Отзывы</h1>
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
			<div className="feedback__wrapper">
				<button className="feedback__prev-button" onClick={handlePrevClick} />
				<div className="feedback__carousel" ref={carouselRef}>
					<div
						className="feedback__track"
						style={{
							transform: isMobile
								? "none"
								: `translateX(-${currentSlide * cardTotalWidth}px)`,
							width: `${trackWidth}px`, // Устанавливаем ширину трека в зависимости от количества карточек
						}}
					>
            {feedbacks.map((feedback, index) => (
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
                    expanded[index] ? "expanded" : ""
                  }`}
                >
                  {expanded[index] ? feedback.fullText : feedback.shortText}
                </p>
                <button
                  className="feedback__more_button"
                  onClick={() => toggleExpanded(index)}
                >
                  {expanded[index] ? "Скрыть" : "Ещё"}
                </button>
                <p className="feedback__card-author">{feedback.author}</p>
                <span className="feedback__card-date">{feedback.date}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="feedback__next-button" onClick={handleNextClick} />
      </div>
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
    </section>
  );
}

export default Feedback;
