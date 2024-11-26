import React, { useRef, useState, useEffect, useMemo } from "react";
// import { fetchDoctorById, fetchDoctors } from "../../utils/api";
import { fetchAllPaidServicesEmployers } from "../../utils/api";
import "./PaidServices.css";
import Button from "../Button/Button";
import DoctorAppointmentModal from "../Doctors/DoctorAppointmentModal/DoctorAppointmentModal";

function PaidServices() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleDetails = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const PaidServicesInfoData1 = [
    {
      question: "Колопроктология",
      answers: [
				"Операции по лечению геморроя, свищей и трещин с применением лазерных технологий ",
				"Сложные операции на промежности: аносфинктеролеваторопластики, перинеопластики",
				"Удаление параректальных кист: лапароскопические и комбинированные доступы ",
				"Реконструктивные операции: ликвидация колостомы, илеостомы, кишечных свищей",
			],
    },
    {
			question: "Хирургия",
      answers: [
				"Лапароскопическая хирургия при остром аппендиците, холецистите, кишечной непроходимости, перфорациях, желчекаменной болезни, грыжах",
				"Пластические операции на брюшной стенке и лапароскопические вмешательства при доброкачественных новообразованиях",
				"Современные технологии для лечения варикозной болезни",
			],
    },
    {
			question: "Урология",
			answers: [
				"Все виды лечения мочекаменной болезни ",
				"Доброкачественная гиперплазия предстательной железы: терапия и хирургическое вмешательство",
				"Кисты и доброкачественные опухоли почки: наблюдение и оперативное лечение ",
				"Стриктуры мочеточников и уретры: реставрация и расширение сужений",
				"Гидронефроз: лечение, направленное на восстановление оттока мочи",
				"Доброкачественные опухоли и дивертикулы мочевого пузыря: диагностика и хирургическая коррекция ",
				"Гидроцеле и варикоцеле: консервативное и хирургическое лечение",
				"Фимоз: применение различных методов коррекции ",
			],
    },
  ];
  const PaidServicesInfoData2 = [
		{
			question: "Магнитно-резонансная томография (МРТ)",
			answers: [
				"МРТ головного мозга — с контрастом и без",
				"МРТ гипофиза — с контрастом и без",
				"МРТ сосудов и артерий — венография, артериография",
				"МРТ брюшной полости и забрюшинного пространства — с контрастом и без",
				"МРТ предстательной железы — с контрастом",
				"МРТ органов малого таза",
				"МРТ всех отделов позвоночника",
				"МРТ всех видов суставов",
				"МРТ всех отделов позвоночника — с контрастом и без",
			],
      
    },
    {
      question: "Компьютерная томография (КТ)",
      answers: [
				"КТ головного мозга — с контрастом и без",
				"КТ околоносовых пазух",
				"КТ органов грудной клетки — с контрастом и без",
				"КТ органов брюшных органов — с контрастом и без ",
				"КТ  тонкой кишки с контрастированием per os и с внутривенным введением контрастного вещества — Энтерография",
				"КТ почек и мочевыводящих путей — с контрастом и без",
				"КТ органов малого таза — с контрастом и без",
				"КТ всех отделов позвоночника",
				"КТ ангиография сосудов — с контрастом",
				"КТ ангиография брахиоцефальных артерий — с контрастом",
				"КТ ангиография аорты — с контрастом",
			],
    },
    {
      question: "Ультразвуковое исследование",
      answers: [
				"",
				"",
				"",
			],
    },
  ];
  const PaidServicesInfoData3 = [
    {
      question: "Лицензия",
      answer: "Выписка из реестра 14.11.2024",
      pdfLink:
        "https://www.gkb-24.ru/static/images-svg/%D0%B2%D1%8B%D0%BF%D0%B8%D1%81%D0%BA%D0%B0-%D0%BB%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F14-11.pdf",
    },
    {
      question:
        "Правила предоставления медицинскими организациями платных медицинских услуг",
      answer: "",
    },
    {
      question: "Образец договора",
      answer: "",
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
        <div className="paid-services__content">
          <div className="paid-services__content-text-container">
            <h1 className="paid-services__title">Платные услуги</h1>
            <p className="paid-services__content-text">
              Уважаемые пациенты! Информируем вас, что запись или перенос приема
              на консультацию и диагностику в отделение платных услуг ГКБ №24,
              осуществляется по телефону
            </p>
            <div className="paid-services__content-cards">
              <div className="paid-services__content-card">
                <h3 className="paid-services__content-card-title">Телефон</h3>
                <p className="paid-services__content-card-text">
                  +7 (495) 613-63-10 доб.1
                </p>
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
                  не рабочий день — воскресенье
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
            src={"https://www.gkb-24.ru/static/images-svg/paid-services.svg"}
            alt="Иллюстрация платных услуг"
          />
        </div>
        <div className="paid-services__our">
         
          <div className="paid-services__top">
            <p className="paid-services__text">
              В ГКБ №24 Вы можете получить консультацию специалистов, имеющих
              большой опыт распознавания и лечения сложных медицинских
              заболеваний
            </p>
            <div className="paid-services__button-container">
              <Button size="small" onClick={openModal}>
                Записаться
              </Button>
              {isModalOpen && (
                <DoctorAppointmentModal
                  onClose={closeModal}
                  // doctorName={full_name}
                />
              )}
              <a
                href="https://www.gkb-24.ru/static/files/%D0%BF%D1%80%D0%B0%D0%B9%D1%81.pdf"
                target="_blank"
                className="paid-services__button-download"
              >
                Скачать прайс услуг
              </a>
            </div>
          </div>
          <div className="paid-services__our-content">
            <img
              className="paid-services__our-image"
              src={
                "https://www.gkb-24.ru/static/images-svg/doctors-services.svg"
              }
              alt="Иллюстрация врачей"
            />
            <div className="paid-services__our-list">
              <p className="paid-services__our-item">
                Консультации ведущих врачей-специалистов больницы
              </p>
              <p className="paid-services__our-item">
                Диагностические исследования на современном оборудовании
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
          <div className="paid-services__top">
            <h2 className="paid-services__directions-title">Направления</h2>
            <div className="paid-services__button-container"></div>
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
                  <div className="paid-services__details-text">
                    {item.answers.map((answer, i) => (
                      <p key={i} className="paid-services__details-answer">
                        {answer}
                      </p>
                    ))}
                  </div>
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
                  <div className="paid-services__details-text">
                    {item.answers.map((answer, i) => (
                      <p key={i} className="paid-services__details-answer">
                        {answer}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="paid-services__doctors-top">
        <h2 className="paid-services__title">Наши врачи</h2>
        <div className="paid-services__button-container">
          <Button size="small" onClick={openModal}>
            Записаться
          </Button>
          {isModalOpen && (
            <DoctorAppointmentModal
              onClose={closeModal}
              // doctorName={full_name}
            />
          )}
          <a
            href="https://www.gkb-24.ru/static/files/%D0%BF%D1%80%D0%B0%D0%B9%D1%81.pdf"
            target="_blank"
            className="paid-services__button-download"
          >
            Скачать прайс услуг
          </a>
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
                    // const mainPhoto = doctor.photos?.[0];

                    return (
                      <div key={index} className="doctors__card">
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

                        <h2 className="doctors__card-title">
                          {doctor.full_name}
                        </h2>
                        {doctor.positions && doctor.positions.length > 0 ? (
                          <p className="doctor-preview-card__positions">
                            {doctor.main_position}
                            {/* Отображаем только первую должность */}
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
              src={"https://www.gkb-24.ru/static/images-svg/dms.svg"}
              alt="Иллюстрация врачей"
            />
            <div className="paid-services__our-list">
              <h3 className="paid-services__dms-title">Страховые компании</h3>
              <p className="paid-services__our-item">СПАО «РЕСО-Гарантия»</p>
              <p className="paid-services__our-item">АО «СОГАЗ»</p>
              <p className="paid-services__our-item">
                ПАО Группа Ренессанс Страхование
              </p>
              <p className="paid-services__our-item">САО «ВСК»</p>
              <p className="paid-services__our-item">ПАО СК «РОСГОССТРАХ»</p>
              <p className="paid-services__our-item">ООО «СОГЛАСИЕ»</p>
              <p className="paid-services__our-item">
                ООО «Абсолют Страхование»
              </p>
              <p className="paid-services__our-item">АО «Альфа Страхование»</p>
              <p className="paid-services__our-item">
                ООО «ИННОВАЦИОННАЯ МЕДИЦИНА»
              </p>
              <p className="paid-services__our-item">
                ООО СК «Сбербанк Страхование»
              </p>
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
              <Button
                to="https://www.gkb-24.ru/platnye-uslugi/nalogoviy-vichet/"
                color="secondary"
              >
                Узнать больше
              </Button>
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
                <div className="paid-services__details-content">
                  {item.pdfLink ? (
                    <a
                      href={item.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="paid-services__pdf-link"
                    >
                      {item.answer}
                    </a>
                  ) : (
                    <p className="paid-services__details-text">{item.answer}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PaidServices;
