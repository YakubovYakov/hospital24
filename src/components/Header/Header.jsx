import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";
import search from "../../images/Search.svg";
import logo1 from "../../images/Лог1.svg";
import logo2 from "../../images/Лог2.svg";
import map from "../../images/Map.svg";
import eye from "../../images/Eye.svg";
import burger from "../../images/burger.png";

function Header() {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const isActive = (path) => activePath === path;

  return (
    <section className="header">
      <div className="header__container">
        <Link className="header__logo" to="/">
          <img src={logo1} alt="logo" />
          <img src={logo2} alt="logo" />
        </Link>
        <div className="header__menu-button">
          <img className="menu-img" src={burger} alt="Кнопка меню" />
        </div>
        <div className="header__buttons-bar">
          <Link
            to="/our-doctors"
            className={`header__button ${
              isActive("/our-doctors") ? "active-button" : ""
            }`}
          >
            Врачи
          </Link>
          <button
            className={`header__button ${
              isActive("/departments") ? "active-button" : ""
            }`}
          >
            Отделения
          </button>
          <button
            className={`header__button ${
              isActive("/services") ? "active-button" : ""
            }`}
          >
            Услуги
          </button>
          <button
            className={`header__button ${
              isActive("/contacts") ? "active-button" : ""
            }`}
          >
            Контакты
          </button>
          <button
            className={`header__button ${
              isActive("/about") ? "active-button" : ""
            }`}
          >
            О больнице
          </button>
        </div>
        <div className="header__numbers-phone">
          <span className="header__number">+ 7 495 685-17-94</span>
          <span className="header__number">+ 7 495 613-63-10</span>
        </div>
        <img
          className="header__address-img"
          src={map}
          alt="Указатель времени работы больницы"
        />
        <div className="header__address-container">
          <p className="header__address-time">Круглосуточно</p>
          <p className="header__address">ул. Писцовая 10</p>
        </div>
      </div>
    </section>
  );
}

export default Header;
