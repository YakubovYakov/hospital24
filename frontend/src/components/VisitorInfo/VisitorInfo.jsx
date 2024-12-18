import React, { useState, useEffect } from "react";
import "./VisitorInfo.css";
import Button from "../Button/Button";
import { useMediaQuery } from "react-responsive";

function VisitorInfo() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeButton, setActiveButton] = useState("medical-departments");
  const handleButtonClick = (buttonType) => setActiveButton(buttonType);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesctop = useMediaQuery({ query: "(min-width: 769px)" });

  const toggleDetails = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const visitorInfoData = [
    {
      question: "Прием передач",
      answers: [
        "Передачи для пациентов принимаются ежедневно строго с 16:00 до 19:00",
        "Передачи принимаются в целлофановых пакетах с указанием ФИО пациента, отделения и номера палаты",
        "Передачи принимаются в корпусах №1 и №2, холл входной группы, у поста охраны",
      ],
    },
    {
      question: "Места для встречи с близкими",
      answers: [
        "Если ваш близкий не в тяжелом состоянии, вы можете встретиться в кофейне корпуса 3",
        "",
        "",
      ],
    },
    {
      question: "Правила въезда",
      answers: [
        "Если ваш близкий не в тяжелом состоянии, вы можете встретиться в кофейне корпуса 3",
        "",
        "",
      ],
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="visitor-info">
      <div className="visitor-info__container">
        <h1 className="visitor-info__title">
          Если Ваш близкий находится у нас
        </h1>
        <div className="visitor-info__cards-container">
          {/* карточка 1 */}
          <div className="visitor-info__card">
            <div className="visitor-info__card-container">
              <h2 className="visitor-info__card-title">
                График посещения пациентов
              </h2>
              <p className="visitor-info__text">
                Уважаемые пациенты и их близкие! Информируем вас, что посещение
                находящихся на лечении в ГКБ №24 пациентов возможно в следующие
                отрезки времени
              </p>
              <div className="visitor-info__info__container">
                <div className="visitor-info__info-text-container">
                  <h3 className="visitor-info__card-content-title">
                    Часы посещения больных в лечебных отделениях
                  </h3>
                  <p className="visitor-info__info-text">
                    с 16:00 до 19:00 — будни
                  </p>
                  <p className="visitor-info__info-text">
                    с 11:00 до 13:00 — суббота, воскресенье, праздники
                  </p>
                  <p className="visitor-info__info-text">
                    с 16:00 до 19:00 — суббота, воскресенье, праздники
                  </p>
                </div>
                <div className="visitor-info__info-text-container">
                  <h3 className="visitor-info__card-content-title">
                    Часы посещения больных в отделение ОРИТ
                  </h3>
                  <p className="visitor-info__info-text">
                    с 13:00 до 15:00 — будни, суббота, воскресенье, праздники
                  </p>
                  <p className="visitor-info__info-text">
                    с 16:00 до 18:00 — будни, суббота, воскресенье, праздники
                  </p>
                </div>
              </div>
              <p className="visitor-info__footer">
                Посещение пациентов осуществляется только по согласованию с
                заведующим отделения с учетом состояния пациента и с согласия
                пациента. Пациенту необходимо заранее предоставить ФИО
                посетителя лечащему врачу или старшей медсестре
              </p>
            </div>
          </div>
          {/* карточка 2 */}
          <div className="visitor-info__card visitor-info__card-2">
            <div className="visitor-info__card-container">
              <h2 className="visitor-info__card-title white-text">
                Как узнать о состоянии здоровья?
              </h2>
              <p className="visitor-info__text white-text">
                В случае если Ваш близкий человек госпитализирован в городской
                стационар, в Едином контакт-центре Вы сможете узнать о состоянии
                его здоровья
              </p>
              <div className="visitor-info__info__container">
                <div className="visitor-info__info-text-container">
                  <h3 className="visitor-info__card-content-title white-text">
                    Телефон
                  </h3>
                  <p className="visitor-info__info-text white-text">
                    +7 (495) 685-17-94
                  </p>
                </div>
                <div className="visitor-info__info-container">
                  <h3 className="visitor-info__card-content-title white-text">
                    Часы работы
                  </h3>
                  <p className="visitor-info__info-text white-text">
                    с 08:00 до 20:00 — будни
                  </p>
                  <p className="visitor-info__info-text white-text">
                    с 08:00 до 16:00 — суббота, воскресенье
                  </p>
                </div>
                <div className="visitor-info__info-text-container">
                  <h3 className="visitor-info__card-content-title white-text">
                    Часы приема лечащего врача
                  </h3>
                  <p className="visitor-info__info-text white-text">
                    с 14:00 до 16:00 — будни
                  </p>
                </div>
              </div>
              <p className="visitor-info__info-text white-text">
                другое время — по согласованию с лечащим врачом
              </p>
            </div>
          </div>
        </div>
        <div className="visitor-info__details-container">
          {visitorInfoData.map((item, index) => (
            <div key={index} className="visitor-info__details">
              <div
                className="visitor-info__details-title"
                onClick={() => toggleDetails(index)}
              >
                {item.question}
                <span
                  className={`visitor-info__details-marker ${
                    openIndex === index ? "open" : ""
                  }`}
                ></span>
              </div>
              {openIndex === index && (
                <div className="visitor-info__details-text">
                  {item.answers.map((answer, i) => (
                    <p key={i} className="visitor-info_details-text">
                      {answer}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="visitor-info__modal">
          <div className="visitor-info__modal-container">
            <h4 className="visitor-info__modal-title">
              Правила посещения пациентов, находящихся на лечении
            </h4>
            <p className="visitor-info__modal-text">
              Дорогие посетители! Просим вас ознакомиться с правилами посещения
              пациентов, в случае нарушения правил, больница оставляет за собой
              право запретить посещение пациентов данными лицами
            </p>
          </div>
          <img
            className="visitor-info__modal-image"
            src="https://www.gkb-24.ru/static/images-svg/hospital.svg"
            alt="Иллюстрация операционной"
          />
        </div>
        <div className="visitor-info__select-wrapper">
          <div className="visitor-info__select">
            <button
              className={`visitor-info__select-button ${
                activeButton === "medical-departments" ? "active_select" : ""
              }`}
              onClick={() => handleButtonClick("medical-departments")}
            >
              Лечебные отделения
            </button>
            <button
              className={`visitor-info__select-button ${
                activeButton === "intensive-care-unit" ? "active_select" : ""
              }`}
              onClick={() => handleButtonClick("intensive-care-unit")}
            >
              Отделение реанимации и интенсивной терапии
            </button>
          </div>
        </div>
        {isDesctop && (
          <div>
            {activeButton === "medical-departments" && (
              <div className="visitor-info__rules-container">
                <p className="visitor-info__rules-text">
                  Допуск посетителей в палату производится только при постельном
                  режиме пациента. Пациенты, которые не ограничены в
                  передвижении, могут встретиться с посетителями в местах
                  комфортного пребывания
                </p>
                <p className="visitor-info__rules-text">
                  Просим на весь период пребывания в больнице переводить
                  средства связи (мобильный телефон, смартфон и т.д.) и другие
                  устройства в беззвучный режим. Просим вас приносить пациентам
                  только продукты, которые соответствуют назначенной диете и
                  согласованны с лечащим врачом. Будьте, пожалуйста, вежливыми и
                  тактичными в отношении пациентов и сотрудников больницы
                </p>
                <p className="visitor-info__rules-text">
                  Пациента, находящегося на лечении в стационарном отделении,
                  могут навещать не более 2-х посетителей одновременно. К
                  посещению пациентов допускаются только лица, достигшие
                  14-летнего возраста
                </p>
                <p className="visitor-info__rules-text">
                  Запрещено посещение пациентов лицами, находящимися в состоянии
                  алкогольного или наркотического опьянения
                </p>
                <p className="visitor-info__rules-text">
                  Запрещено курить в помещениях и на территории больницы
                </p>
                <p className="visitor-info__rules-text">
                  Запрещено посещение пациентов лицами с агрессивным поведением
                  или имеющими внешний вид, не отвечающий
                  санитарно-гигиеническим требованиям, а также находящимся в
                  верхней одежде и без бахил
                </p>
                <div className="visitor-info__rules-buttons-container">
                  <button className="visitor-info__rules-button">
                    Полный список правил посещения
                  </button>
                  <button className="visitor-info__rules-button second-button">
                    Скачать памятку посещения
                  </button>
                </div>
              </div>
            )}

            {activeButton === "intensive-care-unit" && (
              <div className="visitor-info__rules-container">
                <p className="visitor-info__rules-text">
                  Пребывание пациента в ОРИТ не является основанием для запрета
                  его посещения родственниками или законными представителями
                </p>
                <p className="visitor-info__rules-text">
                  Перед посещением пациента, находящегося в ОРИТ, просим
                  родственников или законных представителей пациента
                  ознакомиться с памяткой для посетителей «О правилах посещения
                  пациентов, находящихся в отделениях реанимации и интенсивной
                  терапии ГКБ №24». Форма памятки для посещения за подписью
                  родственника, законного представителя помещается в медицинскую
                  карту стационарного больного
                </p>
                <p className="visitor-info__rules-text">
                  Предоставление информации о состоянии здоровья пациента, а
                  также посещение пациента в условиях ОРИТ возможно при
                  письменном или устном (при невозможности получения
                  письменного) согласии пациента. При бессознательном состоянии
                  пациента посетители, не являющиеся прямыми родственниками
                  пациента, допускаются в ОРИТ только в сопровождении близкого
                  родственника — отца, матери, жены, мужа, взрослых детей
                </p>
                <p className="visitor-info__rules-text">
                  Пациента, находящегося в ОРИТ, одновременно могут посещать не
                  более 2-х человек
                </p>
                <p className="visitor-info__rules-text">
                  Родственники, законные представители, имеющие признаки
                  респираторных инфекций и иных заболеваний, к посещению
                  пациентов не допускаются
                </p>
                <p className="visitor-info__rules-text">
                  Временное ограничение на посещение может быть установлено
                  лечащим врачом или заведующим ОРИТ в связи с проведением
                  лечебно—­диагностических мероприятий в реанимационной палате,
                  во время которых не предусмотрено присутствие посторонних лиц
                </p>
                <div className="visitor-info__rules-buttons-container">
                  <button className="visitor-info__rules-button">
                    Полный список правил посещения
                  </button>
                  <button className="visitor-info__rules-button second-button">
                    Скачать памятку посещения
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {isMobile && (
          <div className="visitor-info__select-mobile">
            <h3 className="visitor-info__select-title">Лечебные отделения</h3>
            <div className="visitor-info__rules-container">
              <p className="visitor-info__rules-text">
                Допуск посетителей в палату производится только при постельном
                режиме пациента. Пациенты, которые не ограничены в передвижении,
                могут встретиться с посетителями в местах комфортного пребывания
              </p>
              <p className="visitor-info__rules-text">
                Просим на весь период пребывания в больнице переводить средства
                связи (мобильный телефон, смартфон и т.д.) и другие устройства в
                беззвучный режим. Просим вас приносить пациентам только
                продукты, которые соответствуют назначенной диете и согласованны
                с лечащим врачом. Будьте, пожалуйста, вежливыми и тактичными в
                отношении пациентов и сотрудников больницы
              </p>

              <div className="visitor-info__rules-buttons-container">
                <button className="visitor-info__rules-button">
                  Полный список правил посещения
                </button>
                <button className="visitor-info__rules-button second-button">
                  Скачать памятку посещения
                </button>
              </div>
            </div>
            <h3 className="visitor-info__select-title">
              Отделение реанимации и интенсивной терапии
            </h3>
            <div className="visitor-info__rules-container">
              <p className="visitor-info__rules-text">
                Пребывание пациента в ОРИТ не является основанием для запрета
                его посещения родственниками или законными представителями
              </p>
              <p className="visitor-info__rules-text">
                Перед посещением пациента, находящегося в ОРИТ, просим
                родственников или законных представителей пациента ознакомиться
                с памяткой для посетителей «О правилах посещения пациентов,
                находящихся в отделениях реанимации и интенсивной терапии ГКБ
                №24». Форма памятки для посещения за подписью родственника,
                законного представителя помещается в медицинскую карту
                стационарного больного
              </p>

              <div className="visitor-info__rules-buttons-container">
                <button className="visitor-info__rules-button">
                  Полный список правил посещения
                </button>
                <button className="visitor-info__rules-button second-button">
                  Скачать памятку посещения
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="visitor-info__window">
          <p className="visitor-info__window-text">
            Пропуск сотрудников правоохранительных органов и иных лица, имеющих
            право беспрепятственного допуска на территорию медицинской
            организации согласно действующему законодательству РФ,
            осуществляется по предоставлению удостоверения личности, служебного
            удостоверения или иного документа, подтверждающего статус, а также
            при наличии соответствующего предписания на совершение деятельности
            в медицинской организации с пациентами, сведения о которых
            охраняются законом и составляют врачебную тайну
          </p>
        </div>
      </div>
    </section>
  );
}

export default VisitorInfo;
