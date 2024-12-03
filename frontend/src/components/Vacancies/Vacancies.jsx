import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { vacancies as vacanciesData } from "../../data/vacanciesData";
import "./Vacancies.css";

function Vacancies() {
  const categoryOrder = [
    "Высший медицинский персонал",
    "Средний медицинский персонал",
    "Административный персонал",
    "Рабочий персонал",
  ];

  const groupedVacancies = useMemo(() => {
    return vacanciesData.reduce((acc, vacansy) => {
      if (!acc[vacansy.category]) {
        acc[vacansy.category] = [];
      }
      acc[vacansy.category].push(vacansy);
      return acc;
    }, {});
  }, []);

  const sortedCategory = useMemo(() => {
    return categoryOrder.filter((category) => groupedVacancies[category]);
  }, [groupedVacancies]);

  return (
    <section className="vacancies">
      <div className="vacancies__container">
        <div className="vacancies__top">
          <div className="vacancies__text-container">
            <h1 className="vacancies__title">Вакансии</h1>
            <h2 className="vacancies__subtitle">
              Присоединяйтесь к команде профессионалов
            </h2>
            <p className="vacancies__text">
              Мы много и усердно работаем, но серьезно относимся к соблюдению
              баланса между работой и личной жизнью. Мы заботимся о сотрудниках,
              учимся друг у друга и способствуем взаимному профессиональному и
              личностному росту
            </p>
          </div>
          <img
            className="vacancies__image"
            src="https://www.gkb-24.ru/static/images-svg/vacancies.svg"
            alt="Иллюстрация врачей"
          />
        </div>
        <div className="vacancies__advantages">
          <h3 className="vacancies__advantages-title">Преимущества</h3>
          <div className="vacancies__advantages-content">
            <div className="vacancies__advantages-card">
              <img
                className="vacancies__advantages-card-icon"
                src="https://www.gkb-24.ru/static/images-svg/vacancies1.svg"
                alt="Иконка"
              />
              <h4 className="vacancies__advantages-card-title">
                Стабильность и поддержка
              </h4>
              <p className="vacancies__advantages-card-text">
                Работа в одном из ведущих московских медицинских учреждений с
                полным соблюдением трудового законодательства, стабильной
                зарплатой, оплатой больничного и отпуска
              </p>
            </div>
            <div className="vacancies__advantages-card">
              <img
                className="vacancies__advantages-card-icon"
                src="https://www.gkb-24.ru/static/images-svg/vacancies2.svg"
                alt="Иконка"
              />
              <h4 className="vacancies__advantages-card-title">
                Здоровье и благополучие
              </h4>
              <p className="vacancies__advantages-card-text">
                Прохождение ежегодной диспансеризации, участие в спортивных
                мероприятиях, а так же современное кафе со скидкой для
                сотрудников
              </p>
            </div>
            <div className="vacancies__advantages-card">
              <img
                className="vacancies__advantages-card-icon"
                src="https://www.gkb-24.ru/static/images-svg/vacancies3.svg"
                alt="Иконка"
              />
              <h4 className="vacancies__advantages-card-title">
                Профессиональное развитие
              </h4>
              <p className="vacancies__advantages-card-text">
                Возможность участвовать в конференциях и международных
                семинарах, учиться и совершенствоваться у лидеров отрасли
              </p>
            </div>
            <div className="vacancies__advantages-card">
              <img
                className="vacancies__advantages-card-icon"
                src="https://www.gkb-24.ru/static/images-svg/vacancies4.svg"
                alt="Иконка"
              />
              <h4 className="vacancies__advantages-card-title">
                Комфортные условия труда
              </h4>
              <p className="vacancies__advantages-card-text">
                Знакомство с умными, приятными, веселыми людьми, которым
                нравится работать вместе. Мы ценим различия, независимо от
                вероисповедания и предубеждений, что позволяет людям достигать и
                вносить свой вклад в полную силу
              </p>
            </div>
          </div>
        </div>
        <div className="vacancies__list">
          <h5 className="vacancies__list-title">Актуальные вакансии</h5>

          {sortedCategory.map((category) => (
            <div key={category} className="vacancies__category">
              <h2 className="vacancies__category-title">{category}</h2>
              <div className="vacancies__items">
                {groupedVacancies[category].map((vacansy) => (
                  <Link
                    key={vacansy.id}
                    target="_blank"
                    to={vacansy.link}
                    className="vacancies__list-item"
                  >
                    <p className="vacancies__list-item-description">
                      {vacansy.title}
                    </p>
                    <div className="vacancies__list-item-container">
                      <span className="vacancies__list-item-text">
                        На постоянной основе
                      </span>
                      <span className="vacancies__list-item-text">
                        м. Савеловская, Москва
                      </span>
                    </div>
                    <img
                      className="vacancies__list-item-icon"
                      src="https://www.gkb-24.ru/static/images-svg/hh-icon.svg"
                      alt="Иконка hh"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="vacancies__contacts">
          <div className="vacancies__contacts-text-container">
            <p className="vacancies__contacts-text">
              Если вы хотите у нас работать, но не нашли подходящей вакансии,
              просто отправьте свое резюме или напишите о себе на почту
              <span>GB24-kadry@zdrav.mos.ru</span>
            </p>
            <h6 className="vacancies__contacts-title">Отдел кадров ГКБ №24</h6>
            <div className="vacancies__contacts-container">
              <div className="vacancies__contacts-content">
                <p className="vacancies__contacts-container-title">Телефоны</p>
                <span className="vacancies__contacts-container-span">
                  +7 (495) 613-11-08
                </span>
                <span className="vacancies__contacts-container-span">
                  +7 (495) 612-11-40
                </span>
              </div>
              <div>
                <p className="vacancies__contacts-container-title">
                  Контактное лицо
                </p>
                <span className="vacancies__contacts-container-span">
                  Микитенко Мария Михайловна
                </span>
              </div>
              <div>
                <p className="vacancies__contacts-container-title">
                  Собеседования по вакантным должностям
                </p>
                <span className="vacancies__contacts-container-span">
                  с 09:00 до 12:00 — понедельник-четверг
                </span>
              </div>
              <div>
                <p className="vacancies__contacts-container-title">Адрес</p>
                <span className="vacancies__contacts-container-span">
                  127015, Москва, Писцовая, д. 10, корпус 1, этаж 2
                </span>
              </div>
            </div>
          </div>
          <img
            className="vacancies__contacts-image"
            src="https://www.gkb-24.ru/static/images-svg/vacansy-image.svg"
            alt="Иллюстарция для страницы вакансий"
          />
        </div>
      </div>
    </section>
  );
}

export default Vacancies;
