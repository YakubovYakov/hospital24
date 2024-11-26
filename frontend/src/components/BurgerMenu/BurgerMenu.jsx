import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BurgerMenu.css";
import logo from "../../images2/Logotype.png";
import tgIcon from "../../images2/footer-img/tg.svg";
import vkIcon from "../../images2/footer-img/vk.svg";

function BurgerMenu({ isBurgerMenuOpen, setIsBurgerMenuOpen }) {
  const handleLinkClick = () => {
    setIsBurgerMenuOpen(false);
  };
  return (
    <div className={`menu ${isBurgerMenuOpen ? "open" : ""}`}>
      <div className="menu__container">
        <div className="moscow-logo">
          <div className="moscow-logo__container">
            <Link
              to="/"
              className="moscow-logo__logo"
              alt="Логотип московской медицины"
							onClick={handleLinkClick}
            />
          </div>
        </div>
        <div className="menu__top">
          <Link className="header__logo" to="/" onClick={handleLinkClick}>
            <img
              className="header__logo-img menu__logo"
              src={logo}
              alt="logo"
            />
          </Link>
          <button
            className="menu__close-button"
            type="button"
            onClick={() => setIsBurgerMenuOpen(false)}
          />
        </div>
        <div className="menu__list">
          <Link to="/our-doctors" className="menu__item" onClick={handleLinkClick}>
            Врачи
          </Link>
          <Link
            to="/departments"
            className="menu__item"
            onClick={handleLinkClick}
          >
            Отделения
          </Link>
          <Link
            to="/paid-services"
            className="menu__item"
            onClick={handleLinkClick}
          >
            Услуги
          </Link>
          <Link to="/contacts" className="menu__item" onClick={handleLinkClick}>
            Контакты
          </Link>
          <Link
            to="/about-hospital"
            className="menu__item"
            onClick={handleLinkClick}
          >
            О больнице
          </Link>
        </div>
        <div className="menu__foter">
          <div>
            <span className="menu__span">Адрес</span>
            <div className="menu__text-container">
              <p className="menu__text">127015, Москва,</p>
              <p className="menu__text">Писцовая, д. 10</p>
            </div>
            <div className="footer__social-links">
              <Link
                className="menu__social-link tg"
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
                className="menu__social-link vk"
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
            <div className="menu__text-container">
              <p className="menu__text">+7 (495) 613-87-01</p>
              <p className="menu__text">+7 (495) 685-17-94</p>
              <p className="menu__text">gkb24@zdrav.mos.ru</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;
