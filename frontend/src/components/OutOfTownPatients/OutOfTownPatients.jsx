import React from "react";
import "./OutOfTownPatients.css";

function OutOfTownPatients() {
  return (
    <section className="out-of-the-town">
      <div className="out-of-the-town__container">
        <h1 className="out-of-the-town__title">Иногородним пациентам</h1>
        <div className="out-of-the-town__cards">
          {/* карточка 1 */}
          <div className="out-of-the-town__card">
            <h2 className="out-of-the-town__card-title">
              Консультации для иногородних пациентов
            </h2>
            <p className="out-of-the-town__card-text">
              Консультации специалистов без направления проводятся для пациентов
              из следующих регионов РФ
            </p>
            <div className="out-of-the-town__card-list">
              <p className="out-of-the-town__card-item">Московская область</p>
              <p className="out-of-the-town__card-item">
                Нижегородская область
              </p>
              <p className="out-of-the-town__card-item">Калужская область</p>
              <p className="out-of-the-town__card-item">Белгородская область</p>
              <p className="out-of-the-town__card-item">Саратовская область</p>
              <p className="out-of-the-town__card-item">Пензенская область</p>
              <p className="out-of-the-town__card-item">
                Ямало-Ненецкий автономный округ
              </p>
            </div>
            <p className="out-of-the-town__card-footer">
              Пациенты из других областей РФ должны взять направление по форме
              057у для получения бесплатной консультации в КДЦ ГКБ №24
            </p>
          </div>
          {/* карточка 2 */}
          <div className="out-of-the-town__card out-of-the-town__card-2">
            <h2 className="out-of-the-town__card-title white-text">
              Консультативно — диагностический центр
            </h2>
            <p className="out-of-the-town__card-text white-text">
              Уважаемые пациенты из регионов РФ! Информируем вас, что запись или
              перенос приема в КДЦ ГКБ №24 без направления и с направлением по
              форме 057у, осуществляется через Единый контакт-центр
            </p>
            <div className="out-of-the-town__info__container">
              <div className="out-of-the-town__info-text-container">
                <h3 className="out-of-the-town__card-content-title white-text">
                  Телефон
                </h3>
                <p className="out-of-the-town__info-text white-text">+7 (495) 685-17-94</p>
              </div>
              <div className="out-of-the-town__info-text-container">
                <h3 className="out-of-the-town__card-content-title white-text">
                  Часы работы
                </h3>
                <p className="out-of-the-town__info-text white-text">
                  с 08:00 до 20:00 — будни, суббота
                </p>
                <p className="out-of-the-town__info-text white-text">
                  воскресенье — выходной
                </p>
              </div>
              <div className="out-of-the-town__info-text-container">
                <h3 className="out-of-the-town__card-content-title white-text">
                  Адрес регистратуры
                </h3>
                <p className="out-of-the-town__info-text white-text">
                  127015, Москва, Писцовая, д. 10, корпус 1, этаж 3
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OutOfTownPatients;
