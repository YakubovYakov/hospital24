import React, { useState } from "react";
import "./Contacts.css";
import FAQ from "../InfoPage/FAQ/FAQ";
import Map from "../Map/Map";
import Button from "../Button/Button";
import FeedbackForm from "../../components/Feedback/FeedbackForm/FeedbackForm";

function Contacts() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className="contacts">
      <div className="contacts__container">
        <h1 className="contacts__title">Контакты</h1>
        {/* карточка 1 */}
        <div className="contacts__cards-container">
          <div className="contacts__card">
            <div className="contacts__card-container">
              <h2 className="contacts__card-title">
                Стационар ГБУЗ «ГКБ № 24»
              </h2>
              <div className="contacts__card-info">
                <div>
                  <h3 className="contacts__card-info-subtitle">Часы приема</h3>
                  <h3 className="contacts__card-info-subtitle">Круглосуточо</h3>
                </div>

                <div>
                  <h3 className="contacts__card-info-subtitle">Адрес</h3>
                  <p className="contacts__card-info-text">
                    127015, Москва, Писцовая, д. 10
                  </p>
                </div>
              </div>
              <h4 className="contacts__card-subtitle">
                По общим вопросам, информация о пациенте и т.д.
              </h4>

              <div className="contacts__card-text-container">
                <div className="contacts__card-content">
                  <h3 className="contacts__card-info-subtitle">Часы работы</h3>
                  <p className="contacts__card-info-text">
                    с 08:00 до 20:00 — будни
                  </p>
                  <p className="contacts__card-info-text">
                    с 08:00 до 16:00 — суббота, воскресенье
                  </p>
                </div>

                <div className="contacts__card-content">
                  <h3 className="contacts__card-info-subtitle">Телефоны</h3>
                  <p className="contacts__card-info-text">+7 (495) 613-87-01</p>
                  <p className="contacts__card-info-text">+7 (495) 685-17-94</p>
                </div>

                <div className="contacts__card-content">
                  <p className="contacts__card-info-text">gkb24@zdrav.mos.ru</p>
                </div>
              </div>
            </div>
          </div>

          {/* карточка 2 */}
          <div className="contacts__card card-2">
            <div className="contacts__card-container">
              <h2 className="contacts__card-title white-text">
                Консультативно — диагностическое отделение
              </h2>

              <div className="contacts__card-text-container">
                <div className="contacts__card-content">
                  <h3 className="contacts__card-info-subtitle white-text">
                    Часы приема пациентов
                  </h3>
                  <p className="contacts__card-info-text white-text">
                    с 08:00 до 20:00 — будни, суббота
                  </p>
                  <p className="contacts__card-info-text white-text">
                    не рабочий день — воскресенье
                  </p>
                </div>

                <div className="contacts__card-content">
                  <h3 className="contacts__card-info-subtitle white-text">
                    Часы записи на прием
                  </h3>
                  <p className="contacts__card-info-text white-text">
                    с 08:00 до 20:00 — будни
                  </p>
                  <p className="contacts__card-info-text white-text">
                    с 08:00 до 16:00 — суббота, воскресенье
                  </p>
                </div>
                <div className="contacts__card-content">
                  <h3 className="contacts__card-info-subtitle white-text">
                    Телефон
                  </h3>
                  <p className="contacts__card-info-text white-text">
                    +7 (495) 685-17-94
                  </p>
                </div>
                <div className="contacts__card-content">
                  <h3 className="contacts__card-info-subtitle white-text">
                    Почта
                  </h3>
                  <p className="contacts__card-info-text white-text">
                    gkb24@zdrav.mos.ru
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* карточка 3 */}

          {/* карточка 4 */}
          <div className="contacts__card card-4">
            <div className="contacts__card-container card-container-4">
              <h2 className="contacts__card-title title-card-4">
                Отделение реабилитации стомированных больных
              </h2>

              <div className="contacts__card-info">
                <div className="contacts__information">
                  <h3 className="contacts__card-info-subtitle">Адрес</h3>
                  <p className="contacts__card-info-text">
                    125167, Москва, Планетная, д. 26
                  </p>
                </div>

                <div className="contacts__information">
                  <h3 className="contacts__card-info-subtitle">
                    Часы приема пациентов
                  </h3>
                  <p className="contacts__card-info-text">
                    с 08:00 до 19:00 — будни
                  </p>
                  <p className="contacts__card-info-text">
                    не рабочие дни — суббота, воскресенье
                  </p>
                </div>

                <div className="contacts__card-content">
                  <h3 className="contacts__card-info-subtitle phones">
                    Телефон
                  </h3>
                  <p className="contacts__card-info-text">+7 (495) 613-27-01</p>
                  <p className="contacts__card-info-text">+7 (495) 613-27-45</p>
                </div>
                <div>
                  <h3 className="contacts__card-info-subtitle phones">Почта</h3>
                  <p className="contacts__card-info-text">gkb24@zdrav.mos.ru</p>
                </div>
              </div>
            </div>
          </div>
          {/* карточка 5 */}
          <div className="contacts__card card-5">
            <div className="contacts__card-container">
              <h2 className="contacts__card-title title-card-5">
                Научно — образовательный центр
              </h2>

              <div className="contacts__card-info">
                <div className="contacts__information">
                  <h3 className="contacts__card-info-subtitle">Адрес</h3>
                  <p className="contacts__card-info-text">
                    127015, Москва, Писцовая, д. 10, каб.210
                  </p>
                </div>

                <div className="contacts__information">
                  <h3 className="contacts__card-info-subtitle">Часы работы</h3>
                  <p className="contacts__card-info-text">
                    с 09:00 до 17:00 — будни
                  </p>
                  <p className="contacts__card-info-text">
                    не рабочие дни — суббота, воскресенье
                  </p>
                </div>

                <div className="contacts__card-content">
                  <h3 className="contacts__card-info-subtitle phones">
                    Телефон
                  </h3>
                  <p className="contacts__card-info-text">+7 (495) 613-04-08</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <FAQ /> */}
      <Map />
      <div className="contacts__container">
        <div className="contacts__cards-container">
          {/* карточка 6 */}
          <div className="contacts__card card-6">
            <div className="contacts__card-container">
              <h2 className="contacts__card-title white-text">
                Связаться с нами
              </h2>
              <p className="contacts__card-text">
                Хотите нас похвалить, выразить обеспокоилось по поводу качества
                лечения или остались еще вопросы. Заполните, пожалуйста, форму
                обратной связи
              </p>
              <div className="contacts__button-container">
                <button onClick={openModal} className="contacts__button">
                  Оставить отзыв
                </button>
								{isModalOpen && <FeedbackForm onClose={closeModal} />}
                <button onClick={openModal} className="contacts__button second-button">
                  Задать вопрос
                </button>
								{isModalOpen && <FeedbackForm onClose={closeModal} />}
              </div>
            </div>
          </div>
          <div className="contacts__card">
            <div className="contacts__card-container">
              <h2 className="contacts__card-title">Консультации в ГКБ №24</h2>
              <p className="contacts__card-text black-text">
                ГБУЗ «ГКБ № 24» — команда лучших специалистов в своей области,
                которая сосредоточена на решение ваших проблем со здоровьем, не
                зависимо от сложности и серьезности проблемы
              </p>
              <div className="contacts__button-container">
                <button className="contacts__button">Узнать больше</button>
                <button className="contacts__button second-button">
                  Скачать прайс услуг
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacts;
