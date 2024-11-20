import React from "react";
import "./OutOfTownPatients.css";
import exclamation_mark from "../../images2/svg/exclamation-mark-2.svg";
import capital_image from "../../images2/svg/capital-image.svg";
import operation from "../../images2/svg/operation.svg";
import { Link } from "react-router-dom";
import MapCard from "../Map/MapCard/MapCard";
import Feedback from "../../components/Feedback/Feedback";

function OutOfTownPatients() {
  return (
    <section className="out-of-the-town">
      <div className="out-of-the-town__container">
        <h1 className="out-of-the-town__title">
          Пройти лечение бесплатно по полису ОМС
        </h1>
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
            <p className="out-of-the-town__card-exclamation-footer">
              Пациенты из других областей РФ должны взять направление по форме
              057у для получения бесплатной консультации в КДО ГКБ №24
            </p>
          </div>
          {/* карточка 2 */}
          <div className="out-of-the-town__card out-of-the-town__card-2">
            <h2 className="out-of-the-town__card-title white-text">
              Консультативно — диагностическое отделение
            </h2>
            <p className="out-of-the-town__card-text white-text">
              Уважаемые пациенты из регионов РФ! Информируем вас, что запись или
              перенос приема в КДО ГКБ №24 без направления и с направлением по
              форме 057у, осуществляется через Единый контакт-центр
            </p>
            <div className="out-of-the-town__info__container">
              <div className="out-of-the-town__info-text-container">
                <h3 className="out-of-the-town__card-content-title white-text">
                  Телефон
                </h3>
                <p className="out-of-the-town__info-text white-text">
                  +7 (495) 685-17-94
                </p>
              </div>
              <div className="out-of-the-town__info-text-container">
                <h3 className="out-of-the-town__card-content-title white-text">
                  Часы работы
                </h3>
                <p className="out-of-the-town__info-text white-text">
                  с 08:00 до 20:00 — будни, суббота
                </p>
                <p className="out-of-the-town__info-text white-text">
                  не рабочие дни — воскресенье
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

          <div className="out-of-the-town__cards-mini">
            {/* карточка 1 */}
            <div className="out-of-the-town__card">
              <h4 className="out-of-the-town__card-title card-title-mini">
                Информация для пациентов
              </h4>
              <p className="out-of-the-town__card-text">
                Уважаемые пациенты! При первичном посещении КДО, просьба
                приходить за 15-20 минут до начала приема для оформления
                медицинской кары в регистратуре
              </p>
            </div>
            {/* карточка 2 */}
            <div className="out-of-the-town__card">
              <h5 className="out-of-the-town__card-subtitle">
                Документы, для пациентов без направления
              </h5>
              <div className="out-of-the-town__card-list">
                <p className="out-of-the-town__card-item">
                  Паспорт гражданина РФ
                </p>
                <p className="out-of-the-town__card-item">
                  Полис Обязательного Медицинского Страхования (ОМС)
                </p>
                <p className="out-of-the-town__card-item">СНИЛС</p>
              </div>

              <div className="out-of-the-town__card-footer">
                <span className="out-of-the-town__marker">
                  <img src={exclamation_mark} alt="!" />
                </span>
                <p>Документы можно предоставить в электронном виде </p>
              </div>
            </div>
          </div>
          {/* карточка 4 */}
          <div className="out-of-the-town__card">
            <h5 className="out-of-the-town__card-subtitle">
              Документы, для пациентов с направлением — форма 057у
            </h5>
            <div className="out-of-the-town__card-list">
              <p className="out-of-the-town__card-item">
                Регистрация на портале МСЗ — номер квоты
              </p>
              <p className="out-of-the-town__card-item">
                Направление в бумажном или электронном виде
              </p>
              <p className="out-of-the-town__card-item">
                Паспорт гражданина РФ
              </p>
              <p className="out-of-the-town__card-item">
                Полис Обязательного Медицинского Страхования (ОМС)
              </p>
              <p className="out-of-the-town__card-item">СНИЛС</p>
            </div>
            <div className="out-of-the-town__image-container">
              <img
                className="out-of-the-town__image"
                alt="Логотип московского здоровья"
                src="https://62.3.58.57/static/images-svg/image%20179.png"
              />
            </div>
            <div className="out-of-the-town__card-footer">
              <span className="out-of-the-town__marker">
                <img src={exclamation_mark} alt="!" />
              </span>
              <p>Документы можно предоставить в электронном виде</p>
            </div>
          </div>
        </div>
        <div className="out-of-the-town__departments">
          <h2 className="out-of-the-town__departments-title">Отделения</h2>
          <div className="out-of-the-town__departments-container">
            <div className="out-of-the-town__departments-content">
              <p className="out-of-the-town__departments-text">
                В ГКБ №24 Вы можете получить консультацию, лечение или Вам
                сделают операцию специалисты, имеющих большой опыт распознавания
                и лечения сложных медицинских заболеваний
              </p>
              <img
                className="out-of-the-town__departments-content-image"
                src="https://62.3.58.57/static/images-svg/Group-37218.png"
                alt="Иллюстрация врачей"
              />
            </div>
            <div className="out-of-the-town__departments-list">
              <p className="out-of-the-town__departments-item">Аллергология</p>
              <p className="out-of-the-town__departments-item">
							Гинекология
              </p>
              <p className="out-of-the-town__departments-item">
                Колопроктология
              </p>
              <p className="out-of-the-town__departments-item">Неврология</p>
              <p className="out-of-the-town__departments-item">Терапия</p>
              <p className="out-of-the-town__departments-item">Урология</p>
              <p className="out-of-the-town__departments-item">Хирургия</p>
            </div>
          </div>
        </div>
        <div className="out-of-the-town__capital">
          <div className="out-of-the-town__capital-top">
            <div className="out-of-the-town__capital-top-content">
              <h2 className="out-of-the-town__capital-top-title">
                Москва — столица здоровья
              </h2>
              <p className="out-of-the-town__capital-top-text">
                Проект «Москва — столица здоровья» помогает иногородним
                пациентам получить информацию о медицинской помощи в московских
                стационарах бесплатно по полису ОМС
              </p>
            </div>
            <img
              className="out-of-the-town__capital-top-image"
              src="https://62.3.58.57/static/images-svg/Group-2.png"
              alt="Картинка Москва Столица-здоровья"
            />
          </div>
          <div className="out-of-the-town__cards">
            {/* карточка 1 */}
            <div className="out-of-the-town__card">
              <p className="out-of-the-town__card-text">
                Для получения подробной информации о бесплатной плановой
                госпитализации по полису ОМС оставьте заявку на официальном
                сайте проекта «Москва — столица здоровья» или по телефону
                горячей линии
              </p>
              <div className="out-of-the-town__info__container">
                <div className="out-of-the-town__info-text-container">
                  <h3 className="out-of-the-town__card-content-title">Сайт</h3>
                  <Link
                    className="out-of-the-town__info-text"
                    to="https://xn--g1ajp.xn--p1ai/"
                  >
                    «Москва – столица здоровья»
                  </Link>
                </div>
                <div className="out-of-the-town__info-text-container">
                  <h3 className="out-of-the-town__card-content-title">
                    Телефон
                  </h3>
                  <p className="out-of-the-town__info-text">
                    +7 (495) 587-70-88
                  </p>
                </div>
                <div className="out-of-the-town__info-text-container">
                  <h3 className="out-of-the-town__card-content-title">
                    Телефон для плановой госпитализации по ОМС
                  </h3>
                  <p className="out-of-the-town__info-text">
                    +7 (495) 587-70-88
                  </p>
                </div>
                <div className="out-of-the-town__info-text-container">
                  <h3 className="out-of-the-town__card-content-title">
                    Часы работы
                  </h3>
                  <p className="out-of-the-town__info-text">Круглосуточно</p>
                </div>
              </div>
              <div className="out-of-the-town__card-image-container">
                <img
                  className="out-of-the-town__card-capital-image"
                  src={capital_image}
                  alt="Иллюстрация Кремль"
                />
              </div>
            </div>
            {/* карточка 2 */}
            <div className="out-of-the-town__card">
              <p className="out-of-the-town__card-text">
                При обращении на горячую линию или официальный сайт проекта
                «Москва – столица здоровья» через форму «Оставить заявку» за
                Вами будет закреплен персональный куратор, который поможет
              </p>
              <div className="out-of-the-town__capital__list">
                <p className="out-of-the-town__departments-capital-item">
                  Выбрать стационар в Москве в соответствии с заболеванием
                </p>
                <p className="out-of-the-town__departments-capital-item">
                  Определиться с датой госпитализации
                </p>
                <p className="out-of-the-town__departments-capital-item">
                  Собрать документы и анализы нужны для плановой госпитализации
                </p>
              </div>
              <p className="out-of-the-town__card-exclamation-capital-footer">
                Решение о возможности и сроках оказания плановой госпитализации
                в клиники Москвы иногородних граждан, застрахованных в системе
                обязательного медицинского страхования, принимается медицинскими
                организациями с учетом имеющихся показаний, возможностей
                медицинской организации и сформированных листов ожидания по
                соответствующему профилю
              </p>
            </div>
          </div>
          <div className="out-of-the-town__capital-window">
            <p className="out-of-the-town__capital-window-text">
              На всей территории РФ по полису ОМС, согласно
              <strong>
                Федеральному закону "Об основах охраны здоровья граждан в
                Российской Федерации" от 21.11.2011 N 323-ФЗ
              </strong>
              и
              <strong>
                Федеральному закону "Об обязательном медицинском страховании в
                Российской Федерации" от 29.11.2010 N 326-ФЗ
              </strong>
              , застрахованные граждане имеют право на:
              <strong>
                выбор города, медицинской организации, врача-специалиста,
                получение плановой и экстренной медицинской помощи
              </strong>
              .
            </p>
          </div>
          <div className="out-of-the-town__oms">
            <div className="out-of-the-town__oms-container">
              <div className="out-of-the-town__oms-text-container">
                <h2 className="out-of-the-town__oms-title">
                  Основные виды операций по ОМС
                </h2>
                <p className="out-of-the-town__oms-text">
                  В городской клинической больнице № 24 Департамента
                  Здравоохранения г. Москвы следующие виды плановых оперативных
                  вмешательств
                </p>
                <div className="out-of-the-town__departments-list">
                  <p className="out-of-the-town__departments-item">
                    Операции на сердце и сосудах
                  </p>
                  <p className="out-of-the-town__departments-item">
                    Удаление желчного пузыря
                  </p>
                  <p className="out-of-the-town__departments-item">
                    Удаление грыжи
                  </p>
                  <p className="out-of-the-town__departments-item">
                    Лапароскопия брюшной полости
                  </p>
                </div>
              </div>
              <img
                className="out-of-the-town__oms-image"
                src={operation}
                alt="Иллюстрация операционной комнаты"
              />
            </div>
          </div>
          <div className="out-of-the-town__contact">
            <div className="out-of-the-town__cards">
              <MapCard
                title="Контакты"
                address="127015, Москва, Писцовая, д. 10"
								tel="+7 (495) 685-17-94"
                coordinates={[55.798814, 37.578785]}
                description="От станции метро «Савёловская» (первый вагон из центра, выход №1) нужно перейти начало Бутырской улицы по подземному переходу и на улицу через правую лестницу, на улице сразу налево на 2-ю Квессинскую улицу. Перейти перекресток на светофоре наискось и двигаться по Вятской улице вверх до первого поворота направо, на Писцовую улицу. Дальше двигаетесь прямо до главного входа в больницу."
                link="https://yandex.ru/maps/-/CDhar445"
              />
              <div className="out-of-the-town__card out-of-the-town__card-3">
                <h2 className="out-of-the-town__card-title white-text">
                  Связаться с нами
                </h2>
                <p className="out-of-the-town__card-contact-text white-text">
                  Связаться с нами Остались еще вопросы? Заполните, пожалуйста,
                  форму обратной связи и мы свяжемся с вами Написать
                </p>
                <button className="out-of-the-town__card-button">
                  Написать
                </button>
              </div>
            </div>
          </div>
          <Feedback />
        </div>
      </div>
    </section>
  );
}

export default OutOfTownPatients;
