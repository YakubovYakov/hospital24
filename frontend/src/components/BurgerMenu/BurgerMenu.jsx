import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BurgerMenu.css";

function BurgerMenu() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  return (
    <div className="menu">
      <div className="menu__container">
        <div>
          <Link className="header__logo" to="/">
            <img className="header__logo-img" src={logo} alt="logo" />
          </Link>
        </div>
        <button className="menu__close-button" type="button" />
        <div className="menu__list">
          <Link className="menu__item">Врачи</Link>
          <Link className="menu__item">Отделения</Link>
          <Link className="menu__item">Услуги</Link>
          <Link className="menu__item">Контакты</Link>
          <Link className="menu__item">О больнице</Link>
        </div>
        <div className="menu__foter">
          <div>
            <span className="menu__span">Адрес</span>
            <p className="menu__text">127015, Москва,</p>
            <p className="menu__text">Писцовая, д. 10</p>
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

          <div>
            <span className="menu__span">Связаться с нами</span>
            <p className="menu__text">+7 (495) 613-87-01</p>
            <p className="menu__text">+7 (495) 685-17-94</p>
            <p className="menu__text">gkb24@zdrav.mos.ru</p>
          </div>
        </div>
      </div>
    </div>
  );
}
