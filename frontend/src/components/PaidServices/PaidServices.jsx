import React, { useRef, useState, useEffect, useMemo } from "react";
import { fetchDoctorById, fetchDoctors } from "../../utils/api";
import "./PaidServices.css";
import paid_services from "../../images/svg/paid-services.svg";
import doctors_services from "../../images/svg/doctors-services.svg";
import dms from "../../images/svg/dms.svg";
import Button from "../Button/Button";

function PaidServices() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDetails = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const PaidServicesInfoData1 = [
    {
      question: "Колопроктология",
      answer: "Ответ",
    },
    {
      question: "Хирургия",
      answer: "Ответ",
    },
    {
      question: "Урология",
      answer: "Ответ",
    },
  ];
  const PaidServicesInfoData2 = [
    {
      question: "Магнитно-резонансная томография (МРТ)",
      answer: "Ответ",
    },
    {
      question: "Компьютерная томография (КТ)",
      answer: "Ответ",
    },
    {
      question: "Ультразвуковое исследование",
      answer: "Ответ",
    },
  ];
  const PaidServicesInfoData3 = [
    {
      question: "Лицензия",
      answer: "Ответ",
    },
    {
      question:
        "Правила предоставления медицинскими организациями платных медицинских услуг",
      answer: "Ответ",
    },
    {
      question: "Образец договора",
      answer: "Ответ",
    },
    {
      question:
        "Перечень категорий граждан, которым предоставляются скидки на платные медицинские услуги",
      answer: "Ответ",
    },
  ];

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
    <section className="paid-services">
      <div className="paid-services__container">
        <h1 className="paid-services__title">Платные услуги</h1>
        <div className="paid-services__content">
          <div className="paid-services__content-text-container">
            <h2 className="paid-services__content-title">
              Отделение платных услуг
            </h2>
            <p className="paid-services__content-text">
              Уважаемые пациенты! Информируем вас, что запись или перенос приема
              на консультацию и диагностику в отделение платных услуг ГКБ №24,
              осуществляется через регистратуру
            </p>
            <div className="paid-services__content-cards">
              <div className="paid-services__content-card">
                <h3 className="paid-services__content-card-title">Телефон</h3>
                <p className="paid-services__content-card-text">
                  +7 (495) 685-17-94
                </p>
              </div>
              <div className="paid-services__content-card">
                <h3 className="paid-services__content-card-title">
                  Часы работы
                </h3>
                <p className="paid-services__content-card-text">
                  с 08:00 до 20:00 — будни, суббота
                </p>
                <p className="paid-services__content-card-text">
                  воскресенье — выходной
                </p>
              </div>
              <div className="paid-services__content-card">
                <h3 className="paid-services__content-card-title">
                  Адрес регистратуры
                </h3>
                <p className="paid-services__content-card-text">
                  127015, Москва, Писцовая, д. 10, корпус 1, этаж 3
                </p>
              </div>
            </div>
          </div>
          <img
            className="paid-services__image"
            src={paid_services}
            alt="Иллюстрация платных услуг"
          />
        </div>
        <div className="paid-services__our">
          <h2 className="paid-services__title">Наши услуги</h2>
          <div className="paid-services__top">
            <p className="paid-services__text">
              В ГКБ №24 Вы можете получить консультацию специалистов, имеющих
              большой опыт в распознавания и лечения сложных медицинских
              проблем, следующих отделений
            </p>
            <div className="paid-services__button-container">
              <Button size="small">Записаться</Button>
              <Button size="large" color="secondary">
                Скачать прайс услуг
              </Button>
            </div>
          </div>
          <div className="paid-services__our-content">
            <img
              className="paid-services__our-image"
              src={doctors_services}
              alt="Иллюстрация врачей"
            />
            <div className="paid-services__our-list">
              <p className="paid-services__our-item">
                Консультации ведущих врачей-специалистов больницы
              </p>
              <p className="paid-services__our-item">
                Диагностические исследования на современном оборудованиия
              </p>
              <p className="paid-services__our-item">
                Лечение в многопрофильном стационаре
              </p>
              <p className="paid-services__our-item">
                Реабилитация, лечебные процедуры и манипуляции
              </p>
              <p className="paid-services__our-item">
                Программы комплексного обследования Check-up
              </p>
            </div>
          </div>
        </div>
        <div className="paid-services__directions">
          <h2 className="paid-services__title">Направления</h2>
          <div className="paid-services__top">
            <p className="paid-services__text">
              В ГКБ №24 Вы можете получить консультацию специалистов, имеющих
              большой опыт в распознавания и лечения сложных медицинских
              проблем, следующих отделений
            </p>
            <div className="paid-services__button-container">
              <Button size="small">Записаться</Button>
              <Button size="large" color="secondary">
                Скачать прайс услуг
              </Button>
            </div>
          </div>
          <div className="paid-services__details-container">
            <h2 className="paid-services__details-title">
              Оперативное вмешательство
            </h2>
            {PaidServicesInfoData1.map((item, index) => (
              <div key={index} className="paid-services__details">
                <div
                  className="paid-services__details-subtitle"
                  onClick={() => toggleDetails(index)}
                >
                  {item.question}
                  <span
                    className={`paid-services__details-marker ${
                      openIndex === index ? "open" : ""
                    }`}
                  ></span>
                </div>
                {openIndex === index && (
                  <p className="paid-services_details-text">{item.answer}</p>
                )}
              </div>
            ))}
            <h2 className="paid-services__details-title">Диагностика</h2>
            {PaidServicesInfoData2.map((item, index) => (
              <div key={index} className="paid-services__details">
                <div
                  className="paid-services__details-subtitle"
                  onClick={() => toggleDetails(index)}
                >
                  {item.question}
                  <span
                    className={`paid-services__details-marker ${
                      openIndex === index ? "open" : ""
                    }`}
                  ></span>
                </div>
                {openIndex === index && (
                  <p className="paid-services_details-text">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="paid-services__doctors-top">
        <h2 className="paid-services__title">Наши врачи</h2>
        <div className="paid-services__button-container">
          <Button size="small">Записаться</Button>
          <Button size="large" color="secondary">
            Скачать прайс услуг
          </Button>
        </div>
      </div>
      <div className="paid-services__doctors-main">
        <div className="doctors-main__container">
          <div className="paid-services__doctors">
            <div className="paid-services__doctors-wrapper">
              <div className="paid-services__doctors-button-container">
                <button
                  className="feedback__prev-button"
                  onClick={handlePrevClick}
                />
                <button
                  className="feedback__next-button"
                  onClick={handleNextClick}
                />
              </div>
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

                        <h2 className="doctors__card-title">
                          {doctor.full_name}
                        </h2>
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
        </div>
      </div>
      <div className="paid-services__container">
        <div className="paid-services__dms">
          <div className="paid-services__top">
            <div>
              <h2 className="paid-services__title">ДМС</h2>
              <p className="paid-services__text">
                Платная медицинская помощь доступна в рамках программы
                добровольного медицинского страхования (ДМС) и по прямому
                договору с физическим лицом за наличный расчет
              </p>
            </div>
            <div className="paid-services__button-container">
              <Button>Полный перечень страховых компаний</Button>
            </div>
          </div>
          <div className="paid-services__dms-content">
            <img
              className="paid-services__dms-image"
              src={dms}
              alt="Иллюстрация врачей"
            />
            <div className="paid-services__our-list">
              <h3 className="paid-services__dms-title">Страховые компании</h3>
              <p className="paid-services__our-item">Альфа-Страхование</p>
              <p className="paid-services__our-item">Росгосстрах</p>
              <p className="paid-services__our-item">Ингосстрах</p>
              <p className="paid-services__our-item">Ресо-Гарантия</p>
              <p className="paid-services__our-item">СОГАЗ</p>
            </div>
          </div>
        </div>
        <div className="paid-services_tax">
          <div className="paid-services__top">
            <h2 className="paid-services__tax-title">
              Получить налоговый вычет
            </h2>
            <div className="paid-services__button-container">
              <Button>Подать заявку на вычет</Button>
              <Button color="secondary">Узнать больше</Button>
            </div>
          </div>
          <p className="paid-services__tax-text">
            При оказании медицинских услуг по договору с физическим лицом мы
            предоставим Вам полный пакет документов в налоговые органы для
            возмещения налогового вычета за оплату медицинских услуг. Это
            поможет вернуть часть потраченных на лечение денежных средств
          </p>
        </div>
        <h2 className="paid-services__title details-title">
          Информация для пациентов
        </h2>
        <div className="paid-services__details-container">
          {PaidServicesInfoData3.map((item, index) => (
            <div key={index} className="paid-services__details">
              <div
                className="paid-services__details-subtitle"
                onClick={() => toggleDetails(index)}
              >
                {item.question}
                <span
                  className={`paid-services__details-marker ${
                    openIndex === index ? "open" : ""
                  }`}
                ></span>
              </div>
              {openIndex === index && (
                <p className="paid-services_details-text">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PaidServices;
