import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import tgIcon from "../../images2/footer-img/tg.svg";
import vkIcon from "../../images2/footer-img/vk.svg";
import logo from "../../images2/Logotype.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__container">
          <div className="footer__content">
            <img className="footer__logo" src={logo} alt="Логотип больницы" />
            <div className="footer__text-container">
              <p className="footer__address">+7 (495) 685-17-94</p>
              <p className="footer__address">г.Москва, ул.Писцовая, д.10</p>
            </div>
            <div className="footer__social-links">
              <Link
                className="footer__social-link tg"
                to="https://t.me/gkb24dzm/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={tgIcon}
                  alt="Telegram"
                  className="footer__social-icon"
                />
              </Link>

              <Link
                className="footer__social-link vk"
                to="https://vk.com/gkb24dzm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={vkIcon} alt="VK" className="footer__social-icon" />
              </Link>
            </div>
          </div>
          <p className="footer__copyright">«ГБУЗ ГКБ 24 ДЗМ» сайт 2024</p>
        </div>

        <div className="footer__container footer__text-container">
          <Link className="footer__link" to="/our-doctors">
            Врачи
          </Link>
          <Link className="footer__link" to="/departments">
            Отделения
          </Link>
          <Link to="/paid-services" className="footer__link">
            Услуги
          </Link>
          <Link className="footer__link">Контакты</Link>
          <Link to="/about-hospital" className="footer__link">
            О больнице
          </Link>
        </div>
        <div className="footer__container footer__text-container">
          <Link to="/general-information" className="footer__link">
            Общая информация
          </Link>
          <Link to="/regulatory-documents" className="footer__link">
            Нормативные документы
          </Link>
          <Link to="/education" className="footer__link">
            Образование
          </Link>
          <Link to="/vacancies" className="footer__link">
            Вакансии
          </Link>
          <Link to="/privacy-policy" className="footer__link">
            Политика обработки
            <br /> персональных данных
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
