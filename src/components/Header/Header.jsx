import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";
import search from "../../images/svg/Search.svg";
import logo1 from "../../images/svg/Лог1.svg";
import logo2 from "../../images/svg/Лог2.svg";
import map from "../../images/svg/Map.svg";
import eye from "../../images/svg/Eye.svg";


function Header() {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <section className="header">
      <div className="header__container">
        <div>
          <Link className="header__logo" to="/">
            <img src={logo1} alt="logo" />
            <img src={logo2} alt="logo" />
          </Link>
        </div>
        <div className="header__menu-button">
					<span></span>
					<span></span>
					<span></span>
        </div>
        <div>
          <div className="header__buttons-bar">
            <Link
              to="/our-doctors"
              className={`header__button ${
                isActive("/our-doctors") || isActive("/doctor")
                  ? "active-button"
                  : ""
              }`}
            >
              Врачи
            </Link>
            <Link
              to="/departments"
              className={`header__button ${
                isActive("/departments") ? "active-button" : ""
              }`}
            >
              Отделения
            </Link>
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
        </div>
				<div className="header__date-content">
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
      </div>
    </section>
  );
}

export default Header;
