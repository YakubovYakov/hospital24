import React, { useEffect } from "react";
import "./PatientInfoPanel.css";
import exclamation_mark from "../../images2/svg/exclamation-mark-2.svg";

function PatientInfoPanel() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="patient-info">
      <div className="patient-info__container">
        <div className="patient-info__content">
          <div className="patient-info__content-text-container">
            <h1 className="patient-info__title">
              У Вас направление к нам из поликлинники
            </h1>
            <p className="patient-info__content-text">
              Уважаемые пациенты! Информируем вас, что запись или перенос приема
              в КДО ГКБ №24 без направления и с направлением по форме 057у,
              осуществляется через Единый контакт-центр
            </p>
            <div className="patient-info__content-cards">
              <div className="patient-info__content-card">
                <h3 className="patient-info__content-card-title">Телефон</h3>
                <p className="patient-info__content-card-text">
                  +7 (495) 685-17-94
                </p>
              </div>
              <div className="patient-info__content-card">
                <h3 className="patient-info__content-card-title">
                  Часы работы
                </h3>
                <p className="patient-info__content-card-text">
                  с 08:00 до 20:00 — будни, суббота
                </p>
                <p className="patient-info__content-card-text">
                  не рабочий день — воскресенье
                </p>
              </div>
              <div className="patient-info__content-card">
                <h3 className="patient-info__content-card-title">
                  Адрес регистратуры
                </h3>
                <p className="patient-info__content-card-text">
                  127015, Москва, Писцовая, д. 10, корпус 1, этаж 3
                </p>
              </div>
            </div>
          </div>
          <img
            className="patient-info__content-image"
            alt="Картинка Ресепшна"
            src="https://www.gkb-24.ru/static/images-svg/reception-kdc.png"
          />
        </div>
        <div className="patient-info__cards-container">
          <div className="patient-info__cards-mini">
            {/* карточка 1 */}
            <div className="patient-info__card">
              <h4 className="patient-info__card-title">
                Информация для пациентов
              </h4>
              <p className="patient-info__card-text">
                Уважаемые пациенты! При первичном посещении КДО, просьба
                приходить за 15-20 минут до начала приема для оформления
                медицинской кары в регистратуре
              </p>
            </div>
            {/* карточка 2 */}
            <div className="patient-info__card">
              <h5 className="patient-info__card-subtitle">
                Документы, для пациентов без направления
              </h5>
              <div className="patient-info__card-list">
                <p className="patient-info__card-item">Паспорт гражданина РФ</p>
                <p className="patient-info__card-item">
                  Полис Обязательного Медицинского Страхования (ОМС)
                </p>
                <p className="patient-info__card-item">СНИЛС</p>
              </div>

              <div className="patient-info__card-footer">
                <span className="patient-info__marker">
                  <img src={exclamation_mark} alt="!" />
                </span>
                <p>Документы можно предоставить в электронном виде</p>
              </div>
            </div>
          </div>
          {/* карточка 3 */}
          <div className="patient-info__card">
            <h5 className="patient-info__card-subtitle">
              Документы, для пациентов с направлением — форма 057у
            </h5>
            <div className="patient-info__card-list">
              <p className="patient-info__card-item">
                Регистрация на портале МСЗ — номер квоты
              </p>
              <p className="patient-info__card-item">
                Направление в бумажном или электронном виде
              </p>
              <p className="patient-info__card-item">Паспорт гражданина РФ</p>
              <p className="patient-info__card-item">
                Полис Обязательного Медицинского Страхования (ОМС)
              </p>
              <p className="patient-info__card-item">СНИЛС</p>
            </div>
            <div className="patient-info__image-container">
              <img
                className="patient-info__image"
                alt="Логотип московского здоровья"
                src="https://www.gkb-24.ru/static/images-svg/image%20179.png"
              />
            </div>
            <div className="patient-info__card-footer">
              <span className="patient-info__marker">
                <img src={exclamation_mark} alt="!" />
              </span>
              <p>Документы можно предоставить в электронном виде</p>
            </div>
          </div>
        </div>
        <div className="patient-info__departments">
          <h2 className="patient-info__content-subtitle">Консультации</h2>
          <div className="patient-info__departments-container">
            <div className="patient-info__departments-content">
              <p className="patient-info__departments-text">
                В ГКБ №24 Вы можете получить консультацию специалистов, имеющих
                большой опыт распознавания и лечения сложных медицинских
                заболеваний
              </p>
              <img
                className="patient-info__departments-image"
                alt="Картинка с врачами"
                src="https://www.gkb-24.ru/static/images-svg/doctors-image-2.jpg"
              />
            </div>
            <div className="patient-info__departments-list">
              <p className="patient-info__departments-item">Аллерголог</p>
              <p className="patient-info__departments-item">Гинеколог</p>
              <p className="patient-info__departments-item">Колопроктолог</p>
              <p className="patient-info__departments-item">Невролог</p>
              <p className="patient-info__departments-item">Терапевт</p>
              <p className="patient-info__departments-item">Уролог</p>
              <p className="patient-info__departments-item">Хирург</p>
            </div>
          </div>
        </div>

        <div className="patient-info__content">
          <div className="patient-info__content-text-container">
            <h2 className="patient-info__content-subtitle">
              Межокружное отделение рассеянного склероза
            </h2>
            <p className="patient-info__content-text">
              Уважаемые пациенты! Информируем вас, что запись или перенос приема
              в МОРС ГКБ №24 без направления и с направлением по форме 057у,
              осуществляется по телефону
            </p>
            <div className="patient-info__content-cards">
              <div className="patient-info__content-card">
                <h3 className="patient-info__content-card-title">Телефон</h3>
                <p className="patient-info__content-card-text">
                  +7 (495) 613-08-85
                </p>
              </div>
              <div className="patient-info__content-card">
                <h3 className="patient-info__content-card-title">
                  Часы работы
                </h3>
                <p className="patient-info__content-card-text">
                  с 08:00 до 16:00 — будни
                </p>
                <p className="patient-info__content-card-text">
                  не рабочие дни — суббота, воскресенье
                </p>
              </div>
              <div className="patient-info__content-card">
                <h3 className="patient-info__content-card-title">
                  Адрес регистратуры
                </h3>
                <p className="patient-info__content-card-text">
                  127015, Москва, Писцовая, д. 10, Родер А (за основным зданием)
                </p>
              </div>
            </div>
          </div>
          <img
            className="patient-info__content-image"
            alt="Картинка Ресепшна"
            src="https://www.gkb-24.ru/static/images-svg/reception-2.svg"
          />
        </div>
        <div className="patient-info__cards-container">
          <div className="patient-info__cards-mini">
            {/* карточка 1 */}
            <div className="patient-info__card">
              <h4 className="patient-info__card-title">
                Информация для пациентов
              </h4>
              <p className="patient-info__card-text">
                Уважаемые пациенты! При первичном посещении МОРС, просьба
                приходить за 15-20 минут до начала приема для оформления
                медицинской кары в регистратуре
              </p>
            </div>
            {/* карточка 2 */}
            <div className="patient-info__card">
              <h5 className="patient-info__card-subtitle">
                Документы, для пациентов без направления
              </h5>
              <div className="patient-info__card-list">
                <p className="patient-info__card-item">Паспорт гражданина РФ</p>
                <p className="patient-info__card-item">
                  Полис Обязательного Медицинского Страхования (ОМС)
                </p>
                <p className="patient-info__card-item">СНИЛС</p>
                <p className="patient-info__card-item">Снимки МРТ — диски</p>
                <p className="patient-info__card-item">
                  Другая медицинская документация по вашему заболеванию
                </p>
              </div>

              <div className="patient-info__card-footer">
                <span className="patient-info__marker">
                  <img src={exclamation_mark} alt="!" />
                </span>
                <p>Необходимо иметь оригинал документов</p>
              </div>
            </div>
          </div>
          {/* карточка 3 */}
          <div className="patient-info__card">
            <h5 className="patient-info__card-subtitle">
              Документы, для пациентов с направлением — форма 057у
            </h5>
            <div className="patient-info__card-list">
              <p className="patient-info__card-item">
                Бумажное направление форма 057у
              </p>
              <p className="patient-info__card-item">Паспорт гражданина РФ</p>
              <p className="patient-info__card-item">
                Полис Обязательного Медицинского Страхования (ОМС)
              </p>
              <p className="patient-info__card-item">СНИЛС</p>
              <p className="patient-info__card-item">Снимки МРТ — диски</p>
              <p className="patient-info__card-item">
                Другая медицинская документация по вашему заболеванию
              </p>
            </div>

            <div className="patient-info__card-footer card-footer-2">
              <span className="patient-info__marker">
                <img src={exclamation_mark} alt="!" />
              </span>
              <p>Необходимо иметь оригинал документов</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PatientInfoPanel;
